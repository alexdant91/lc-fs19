/**
 * Get the root element of a specific slot.
 * @param {string} slot_name - The name of the slot.
 * @returns {Element} - The root element of the slot.
 */
export const $getSlotRoot = (slot_name) => {
    return document.querySelector(`slot[name="${slot_name}"]`);
}

/**
 * Get the root element of a specific router.
 * @param {string} id - The id of the router.
 * @returns {Element} - The root element of the router.
 */
export const $getRouterRoot = (id) => {
    return document.querySelector(`#${id}`);
}

/**
 * Create a listener object for a specific component.
 * @param {string} component_name - The name of the component.
 * @returns {Object} - The listener object.
 */
export const $listener = (component_name) => {
    const listeners = new Map();

    if (!listeners.has(component_name)) {
        listeners.set(component_name, []);
    }

    return {
        /**
         * Add an event listener to the document.
         * @param {string} event - The event name.
         * @param {Function} cb - The callback function.
         */
        on: (event, cb) => {
            document.addEventListener(event, cb);
            listeners.get(component_name).push({ event, cb });
        },
        /**
         * Remove an event listener from the document.
         * @param {string} event - The event name.
         */
        off: (event) => {
            const cb = listeners.get(component_name).find(({ event: _event }) => event === _event)?.cb;
            document.removeEventListener(event, cb);
        },
        /**
         * Remove all event listeners from the document.
         */
        offAll: () => {
            listeners.get(component_name).forEach(({ event, cb }) => {
                document.removeEventListener(event, cb);
            });
        }
    }
}

/**
 * Render HTML content to a root element and execute watchers on state change.
 * @param {Element} $root - The root element to render the HTML content.
 * @param {Function} HTML - The function that returns the HTML content.
 * @param {Array} watchers - The array of watchers to execute on state change.
 * @returns {Function} - The render function.
 */
export const render = ($root, HTML, watchers = []) => {
    const _render = (cb) => {
        $root.innerHTML = HTML();
    
        if (typeof cb === "function") cb();
    }

    watchers.forEach(({ key, exec }) => store.on("STATE_CHANGE", (_key, state) => {
        if (key === _key) {
            if(typeof exec === "function") exec();
            _render();
        }
    }));

    return _render;
}

/**
 * Redirect to a specific path.
 * @param {string} path - The path to redirect to. If not provided, it will use the current hash path or "/".
 */
export const $redirect = (path = window.location.hash.substring(1) || "/") => {
    window.location.hash = path;
    store.emit("PATH_CHANGE", path);
}

/**
 * Get the query parameters from the current hash path.
 * @returns {Object} - The query parameters object.
 */
export const $useQuery = () => {
    const query = window.location.hash.substring(1).split("?")[1].split("&").reduce((acc, curr) => {
        const [key, value] = curr.split("=");
        return { ...acc, [key]: value };
    }, {});

    return query;
}

/**
 * Get the route parameters from the current hash path based on the route name.
 * @param {string} routeName - The name of the route.
 * @returns {Object|null} - The route parameters object if the route matches, otherwise null.
 */
export const $useParams = (routeName) => {
    const route = routesMap.get(routeName);
    const path = (window.location.hash.substring(1) || "/").split("?")[0];
    const pathSplit = path.split("/");
    const _pathSplit = route.path.split("/");
    const params = {};
    let match = true;

    if (pathSplit.length === _pathSplit.length) {
        for (let i = 0; i < _pathSplit.length; i++) {
            if (_pathSplit[i].startsWith(":")) {
                params[_pathSplit[i].substring(1)] = pathSplit[i];
            } else if (_pathSplit[i] !== pathSplit[i]) {
                match = false;
                break;
            }
        }
    } else {
        match = false;
    }

    return match ? params : null;
}

const routesMap = new Map();

/**
 * Creates a router object that handles routing and rendering of different routes.
 * @param {Array} routes - An array of route objects.
 * @returns {Object} - The router object.
 */
export const Router = (routes) => {
    const allHistory = new Map();

    store.on("PATH_CHANGE", (path) => {
        redirect(path);
    });

    routes.forEach((route) => {
        if (route.name) {
            if (!routesMap.has(route.name)) {
                routesMap.set(route.name, route);
            }
        }
    });

    if (!routesMap.has("404")) {
        routesMap.set("404", {
            name: "404",
            path: "*",
            element: () => {
                _404({ root: $getRouterRoot("root") })();
            }
        });
    }

    const redirect = (path = window.location.hash.substring(1) || "/") => {
        let matches = 0;

        routes.forEach(({ name = null, path: _path, element, protectLogic, redirectOnProtected = "/login" }) => {
            if (name) {
                if (!allHistory.has(name)) {
                    allHistory.set(name, { path: _path, element, protectLogic, redirectOnProtected, rendered: false });
                }
            }
            
            if (_path === "*" && name !== "404") {
                if (!name || !allHistory.get(name).rendered) {
                    element();
                    if (name) allHistory.get(name).rendered = true;
                }
            } else {
                if (_path.indexOf(":") === -1 && _path === path) {
                    if (typeof protectLogic === "function") {
                        if (protectLogic()) {
                            element();
                            matches++;
                        } else {
                            redirect(redirectOnProtected);
                        }
                    } else {
                        element();
                        matches++;
                    }
                } else {
                    const pathSplit = path.split("/");
                    const _pathSplit = _path.split("/");
                    const params = {};
                    let match = true;

                    if (pathSplit.length === _pathSplit.length) {
                        for (let i = 0; i < _pathSplit.length; i++) {
                            if (_pathSplit[i].startsWith(":")) {
                                params[_pathSplit[i].substring(1)] = pathSplit[i];
                            } else if (_pathSplit[i] !== pathSplit[i]) {
                                match = false;
                                break;
                            }
                        }
                    } else {
                        match = false;
                    }

                    if (match) {
                        if (typeof protectLogic === "function") {
                            if (protectLogic()) {
                                element(params);
                                matches++;
                            } else {
                                redirect(redirectOnProtected);
                            }
                        } else {
                            element(params)
                            matches++;    
                        };
                    }
                }
            }
        });

        if (matches === 0) {
            routesMap.get("404").element();
        }
    }

    redirect();

    return {
        plugins: {
            /**
             * Register plugins to be executed.
             * @param {Array} _plugins - An array of plugin objects.
             */
            register: (_plugins) => {
                _plugins.forEach((plugin) => {
                    if (Object.keys(plugins).indexOf(plugin.name) !== -1) {
                        plugin.exec();
                    }
                });
            }
        }
    }
}
/**
 * @module plugins
 */

import { $redirect } from "./main.mjs";

/**
 * Plugin for automatically navigating links based on a specified data attribute.
 * @param {string} [data_attribute_name="link"] - The name of the data attribute to check for.
 * @returns {Object} - The plugin object.
 * @property {string} name - The name of the plugin.
 * @property {Function} exec - The function that executes the plugin.
 */
export const plugins = {
    $useAutoNavigateLinks: (data_attribute_name = "link") => {
        return {
            name: "$useAutoNavigateLinks",
            exec: () =>  {
                document.addEventListener("click", (event) => {
                    if (event.target.dataset[data_attribute_name] !== undefined) {
                        event.preventDefault();
                        $redirect(event.target.href.replace(window.location.origin, ""));
                    }
                });
            }
        }
    }
}
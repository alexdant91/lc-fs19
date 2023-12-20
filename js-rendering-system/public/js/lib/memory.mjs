/**
 * A module for interacting with the browser's local storage.
 * @module memory
 */

/**
 * An object representing the internal memory.
 * @namespace internalMemory
 */
export const internalMemory = {
    /**
     * Retrieves the value associated with the given key from local storage.
     * @param {string} key - The key to retrieve the value for.
     * @returns {*} The value associated with the key, or null if the key does not exist.
     * @throws {Error} If the key is not a valid string or is empty.
     */
    get: (key) => {
        if (typeof key !== "string" || key === "") {
            throw new Error("key must be a valid string");
        }

        return JSON.parse(localStorage.getItem(key));
    },

    /**
     * Sets the value associated with the given key in local storage.
     * @param {string} key - The key to set the value for.
     * @param {*} value - The value to be set.
     * @throws {Error} If the key is not a valid string or is empty.
     * @throws {Error} If the value is undefined.
     */
    set: (key, value) => {
        if (typeof key !== "string" || key === "") {
            throw new Error("key must be a valid string");
        }
        if (value === undefined) {
            throw new Error("missing required value");
        }

        localStorage.setItem(key, JSON.stringify(value));
    },

    /**
     * Removes the value associated with the given key from local storage.
     * @param {string} key - The key to remove the value for.
     * @throws {Error} If the key is not a valid string or is empty.
     */
    remove: (key) => {
        if (typeof key !== "string" || key === "") {
            throw new Error("key must be a valid string");
        }

        localStorage.removeItem(key);
    },

    /**
     * Clears all values from local storage.
     */
    clear: () => {
        localStorage.clear();
    }
}
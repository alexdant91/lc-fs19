/**
 * Represents the state of an application.
 * @extends Observer
 */
export class State extends Observer {
    #state;
    #permanentKeys;
    /**
     * Creates a new State instance.
     * @param {Object} initialState - The initial state of the application.
     * @param {Array} permanentKeys - An array of keys that should be stored permanently.
     */
    constructor(initialState = {}, permanentKeys = []) {
        super();
        this.#state = initialState;
        this.#permanentKeys = permanentKeys;
    }

    /**
     * Retrieves the value of a specific key from the state.
     * @param {string} key - The key to retrieve the value for.
     * @returns {*} The value associated with the key, or the entire state if no key is provided.
     */
    getState(key) {
        return key ? this.#state[key] : this.#state;
    }

    /**
     * Sets the value of a specific key in the state.
     * @param {string} key - The key to set the value for.
     * @param {*} newState - The new value to set for the key.
     */
    setState(key, newState) {
        this.#state = { ...this.#state, [key]: { ...this.#state[key], ...newState } };
        if (this.#permanentKeys.indexOf(key) !== -1) internalMemory.set(key, this.#state[key]);
        this.emit("STATE_CHANGE", key, this.#state);
    }
}
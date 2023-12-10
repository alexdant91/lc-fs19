/**
 * Represents an Observer that allows subscribing to and emitting events.
 */
export class Observer {
    #events;

    constructor() {
        this.#events = new Map();
    }

    /**
     * Subscribes to an event with a callback function.
     * @param {string} event - The event name.
     * @param {Function} callback - The callback function to be executed when the event is emitted.
     */
    on(event, callback) {
        if (!this.#events.has(event)) {
            this.#events.set(event, []);
        }
        this.#events.get(event).push(callback);
    }

    /**
     * Emits an event with optional arguments.
     * @param {string} event - The event name to be emitted.
     * @param {...any} args - Optional arguments to be passed to the event callbacks.
     */
    emit(event, ...args) {
        if (this.#events.has(event)) {
            this.#events.get(event).forEach(callback => {
                callback(...args);
            });
        }
    }
}
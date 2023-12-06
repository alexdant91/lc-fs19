export class Observer {
    #events;

    constructor(){
        this.#events = new Map();
    }

    on = (event, callback) =>{
        if (typeof event !== "string" || event === "") {
            throw new Error("event must be a valid string");
        }
        if (typeof callback !== "function") {
            throw new Error("callback must be a valid function");
        }

        if (!this.#events.has(event)) {
            this.#events.set(event, []);
        }
        this.#events.get(event).push(callback);
    }

    emit = (event, ...args) => {
        if (typeof event !== "string" || event === "") {
            throw new Error("event must be a valid string");
        }
        if(this.#events.has(event)){
            this.#events.get(event).forEach(callback => {
                callback(...args);
            });
        }
        
    }
}

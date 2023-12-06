import { Observer } from "./observer.mjs";

export class State extends Observer {
    #state;
    constructor(initialState ={}){
        super();
        this.#state = initialState;
    }

    setState = (key, value) =>{
        this.#state[key] = typeof value === "function" ? value(this.#state[key]) : value;
        this.emit("state_change", this.#state);
    }

    getState = (key) =>{
        return this.#state[key];
    }
}
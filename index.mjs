import { State } from "./state.mjs";

const state = new State({
    counter: 0,
});

setInterval(() => {
    state.setState("counter",(counter) =>{
        return counter++;
    });
},2000);

state.on("state_change", (newValue) => {
    console.log(newValue);
});
import { Login } from "./components/Login.mjs";
import { Profile } from "./components/profile.mjs";

const $root = document.querySelector("#root");

const switchUI = (path = "/login") => {
    switch(path) {
        case "/login":
            Login({ root: $root, onChangeUI: switchUI });
            break;
        case "/profile":
            Profile({ root: $root, onChangeUI: switchUI });
            break;
        default:
            Login({ root: $root, onChangeUI: switchUI });
            break;
    }
}

switchUI();
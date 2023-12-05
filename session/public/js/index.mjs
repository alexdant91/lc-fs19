import { Navbar } from "./components/Navbar.mjs";
import { Home } from "./pages/Home.mjs";
import { Login } from "./pages/Login.mjs";
import { Profile } from "./pages/Profile.mjs";

const $root = document.querySelector("#root");
const $head = document.querySelector("#head");

const switchUI = (path = "/") => {
    switch(path) {
        case "/":
            Home({ root: $root, onChangeUI: switchUI });
            break;
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

Navbar({ root: $head, onChangeUI: switchUI });

switchUI();
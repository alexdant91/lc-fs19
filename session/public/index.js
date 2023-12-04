const $loginForm = document.querySelector("#login");
// const $emailInput = document.querySelector("#email");
// const $passwordInput = document.querySelector("#password");
const $inputs = $loginForm.querySelectorAll("input");
const $loginPage = document.querySelector("#login-page");
const $profilePage = document.querySelector("#profile-page");
const $logoutBtn = document.querySelector("#logout");

const state = {
    form: {
        email: "",
        password: "",
    },
    auth: {
        user: null,
        token: null,
    }
}

const handleInput = (event) => {
    const {name, value} = event.target;

    state.form[name] = value;
}

const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...state.form
            })
        });
        const result = await response.json();

        if (response.ok) {
            state.auth = {...result};
            switchUI();
        } else {
            console.log(result);
            throw new Error("Server error");
        }
    } catch (error) {
        console.log(error.message);
    }
}

const renderLoginPage = () => {
    $loginPage.classList.remove("hidden");
    $profilePage.classList.add("hidden");
}

const renderProfilePage = () => {
    $profilePage.classList.remove("hidden");
    $loginPage.classList.add("hidden");
}

const switchUI = () => {
    if (state.auth.token == null) {
        renderLoginPage();
    } else {
        renderProfilePage();
    }
}

const logout = () => {
    state.auth.token = null;
    state.auth.user = null;
    switchUI();
}

const setEventListeners = () => {
    // $emailInput.addEventListener("input", handleInput);
    // $passwordInput.addEventListener("input", handleInput);
    $inputs.forEach(($input) => $input.addEventListener("input", handleInput));
    $loginForm.addEventListener("submit", handleSubmit);
    $logoutBtn.addEventListener("click", logout);
}

const init = () => {
    switchUI();
    setEventListeners();
}

init();
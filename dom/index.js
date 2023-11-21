// const $divContainer = document.querySelector("#container")

// $divContainer.innerHTML = `
// <ul>
//     <li>1</li>
//     <li>2</li>
// </ul>
// ${$divContainer.innerHTML}
// `

// $divContainer.style.backgroundColor = "red"

//---------------------------------------------------

// const $buttonAdd = document.querySelector("#add");
// const $spanCounter = document.querySelector("#counter");
// const $selectMode = document.querySelector("#mode");
// const $inputNumber = document.querySelector("#number");

// const state = {
//     counter: 0,
//     mode: $selectMode.value, // ADD
//     number: Number($inputNumber.value), // 1
// }

// const updateCounter = () => {
//     if (state.mode === "ADD") {
//         state.counter = (Number(state.counter) + state.number).toFixed(2);
//     } else if (state.mode === "REMOVE"){
//         state.counter = (Number(state.counter) - state.number).toFixed(2);
//     } else if (state.mode === "MULTIPLY"){
//         state.counter = (Number(state.counter) * state.number).toFixed(2);
//     } else if (state.mode === "DIVIDE"){
//         state.counter = (Number(state.counter) / state.number).toFixed(2);
//     }
// }

// const renderCounter = () => {
//     $spanCounter.innerHTML = state.counter;
// }

// $selectMode.addEventListener("change", (event) => {
//     state.mode = event.target.value;
//     $buttonAdd.innerHTML = state.mode;
// })

// $inputNumber.addEventListener("input", (event) => {
//     state.number = Number(event.target.value);
// })

// $buttonAdd.addEventListener("click", () => {
//     updateCounter();
//     renderCounter();
// })

//---------------------------------------------------

const $inputName = document.querySelector("#name");
const $spanText = document.querySelector("#text");

const state = {
    name: ""
}

const updateName = (event) => {
    state.name = event.target.value;
}

const renderName = () => {
    $spanText.innerHTML= state.name;
}

$inputName.addEventListener("input", (event) => {
    updateName(event);
    renderName();
})
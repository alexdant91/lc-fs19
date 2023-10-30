function funzione(parametri) {

}

const test = (text) => {
    console.log(text);

    return 10
}

(() => {

})()

const a = test // reference di una funzione

const b = a

// test("from test") // esecuzione di una funzione


const utility = {
    // log: test("from utility")
}

// console.log(utility)

// utility.log("from log")

// console.log(a(5));
// console.log(b(15));


const closure = (str) => {
    const inner = (text) =>{
        console.log(str, "inner", text);
        return 100
    }
    const inner2 = (text) =>{
        console.log(str, "inner2", text);
        return ["verde", "rosso"]
    }
     return {inner2, inner}
}

console.log(closure(5).inner2("from text 2")[1]);
console.log(closure(10).inner("from text"))

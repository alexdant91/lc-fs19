//FOREACH
/* const forEach = function (callbackFn = (item, index, array) => { }) {
  for (let i = 0; i < this.length; i++) {
    callbackFn(this[i], i, this);
  }
}

Array.prototype.forEach = forEach;

// Tuo codice
const fruits = ["Mela", "Banana", "Kiwi", "Fragola"];

function forEachFruit(array) {
  array.forEach(function (element) {
    console.log(element + "//");
  });
}

forEachFruit(fruits); */

//MAP

// const map = function (callbackFn = (item, index, array) => { }) {
//     const array = [];
//     for (let i = 0; i < this.length; i++) {
//       const result = callbackFn(this[i], i, this);
//       array.push(result)
//     }
//     return array;
//   }

//   Array.prototype.map = map;

//   const fruits = ["Mela", "Banana", "Kiwi", "Fragola"];

//   const newArray = fruits.map((fruit) => {
//     if (fruit != "Banana") {
//       return ({ name: fruit })
//     } else{
//       return "it is a banana"
//     }
//   })

//   console.log(newArray);

//FILTER

const filter = function (callbackFn = (item, index, array) => { }) {
    const array = [];
    for (let i = 0; i < this.length; i++) {
        const testResult = callbackFn(this[i], i, this);
        if (testResult) {
            array.push(this[i]);
        }
    }
    return array;
};


Array.prototype.filter = filter;


const persons = [
    { name: 'Paul', age: 16 },
    { name: 'George', age: 17 },
    { name: 'Lucas', age: 21 },
    { name: 'Marco', age: 32 },
    { name: 'Peter', age: 18 },
    { name: 'Carl', age: 13 },
    { name: 'Simon', age: 24 },
    { name: 'Mark', age: 15 },
    { name: 'Sandra', age: 34 },
    { name: 'Alice', age: 28 }
];

const newArray = persons.filter((element) => element.age >= 18)
console.log(newArray);
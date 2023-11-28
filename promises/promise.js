// const getResult = (a, b) => new Promise((resolve, reject) => {
//     if(typeof a === "number" && typeof b === "number"){
//         return resolve(a * b);
//     }else{
//         return reject(new Error("a and b must be valid numbers"));
//     }
// })

// getResult("uno", 2).then((value) => {
//     console.log(value);
// }).catch((error) => {
//     console.log(error.message);
// }).finally(() => {
//     console.log("ciao");
// });

// const init = async () => {
//     try {
//         const result = await getResult(2, 1);
//         console.log(result);
//     } catch (error) {
//         console.log(error.message);
//     }
// } 

// init()

const fetchData = async () => {
  try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
          method:"GET"
      });
      const data = await response.json();
      if(!response.ok){
          throw new Error("errore");
      }
       console.log(data);
  } catch (error) {
      console.log(error);
  }
}
fetchData();
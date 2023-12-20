// 1. devo selezionare elementi html?
const $tbody = document.querySelector("#tbody");
// 2. mi servono variabili statiche? (link)
const API_URL= "https://dummyjson.com/products";
// 3. dove mi salvo i dati?
const state = {
    // 3.1 che valore do di default?
    data: [],
}
//7. mi serve splittare la logica creando delle utilities?
const utilities = { 
    generateTableRowHTML: (item) => {
        return `
            <tr>
                <td>${item.id}</td>
                <td>${item.title}</td>
                <td>${item.price}</td>
                <td>${item.category}</td>
                <td><img src= "${item.thumbnail}"></td>
            </tr>
        `
    }
}
//4. ho già i dati a disposizione?
const fetchData = async () => {
    try {
        const response = await fetch(API_URL, { method: "GET" });
        const result = await response.json();

        if (response.ok) {
            state.data = result.products;
        } else {
            throw new Error(result);
        }
    } catch (error) {
        console.log(error);
    }
}
// devo renderizzare i dati da qualche parte? (html nella pagina)
const renderData = () => {
    const HTML = state.data.map(item => utilities.generateTableRowHTML(item)).join("");

    $tbody.innerHTML = HTML;
}
//8. mi serve una funzione init che mi permette di eseguire sotto funzioni in un ordine prestabilito?
const init = async () => {
    await fetchData();
    renderData();
}
//ricorda di eseguire init SEMPRE come ultima cosa
init();
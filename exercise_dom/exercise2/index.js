const $tbody = document.querySelector("#tbody");

const API_URL= "https://jsonplaceholder.typicode.com/comments";

const state = {
    data: [],
}

const utilities = { 
    generateTableRowHTML: (item) => {
        return `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td><a href="mailto:${item.email}">click for email</td>
            </tr>
        `
    }
}

const fetchData = async () => {
    try {
        const response = await fetch(API_URL, { method: "GET" });
        const result = await response.json();

        if (response.ok) {
            state.data = result;
            console.log(state.data);
        } else {
            throw new Error(result);
        }
    } catch (error) {
        console.log(error);
    }
}

const renderData = () => {
    const HTML = state.data.map(item => utilities.generateTableRowHTML(item)).join("");

    $tbody.innerHTML = HTML;
}

const init = async () => {
    await fetchData();
    renderData();
}

init();
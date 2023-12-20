const $tbody = document.querySelector("#tbody");

const API_URL = "https://api.publicapis.org/entries"

const state = {
    date:[]
}

const fetchData = async () => {
    try {
        const response = await fetch(API_URL,{ method: "GET" });
        const result = await response.json();
        if (response.ok) {
            state.data = result.entries;
        } else {
            throw new Error(result);
        }
    } catch (error) {
        console.log(error.message);
    }
};

const utilities = {
    generateRowHTML: (item) => {
        return `
        <tr>
            <td>${item.API}</td>
            <td>${item.Description}</td>
            <td>${item.Auth}</td>
            <td>${item.HTTPS ? "yes" : "no"}</td>
            <td>${item.Cors}</td>
            <td><a href="${item.Link}">${item.API}</a></td>
            <td>${item.Category}</td>
        </tr>
        `
    }
}

const renderData = () => {
    const HTML = state.data.map((item) => utilities.generateRowHTML(item)).join("")

    $tbody.innerHTML = HTML
}

const init = async () => {
    await fetchData();
    renderData()
}

init()
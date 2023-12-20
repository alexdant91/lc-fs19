const $tbody = document.querySelector("#tbody");

const API_URL = "https://dummyjson.com/comments";

const state = {
    data: [],
}

const utilities = {
    renderRowTableHTML: (item) => {
        return `
            <tr>
                <td>${item.id}</td>
                <td>${item.body}</td>
                <td>${item.postId}</td>
                <td>${item.user.username}</td>
            </tr>
        `
    }
}

const fetchData = async () => {
    try {
        const responce = await fetch(API_URL, { method: "GET" });
        const result = await responce.json();
        if (responce.ok) {
            state.data = result.comments;
            console.log(state.data);
        } else {
            throw new Error(result);
        }
    } catch (error) {
        console.log(error.message);
    }
}

const renderData = () => {
    const HTML = state.data.map(item => utilities.renderRowTableHTML(item)).join("");
    console.log(HTML);
    $tbody.innerHTML = HTML;
}

const init = async () => {
    await fetchData();
    renderData();
}

init();
const $tbody = document.querySelector("#tbody");
const $prevBtn = document.querySelector("#prev");
const $nextBtn = document.querySelector("#next");
const $currentPageSpan = document.querySelector("#currentPage");
const $totalPagesSpan = document.querySelector("#totalPages");

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const state = {
    data: [], //copia di rendering
    _data: [], //copia di cache
    paginationInfo: { 
        page: 1,
        totalPages: 1,
        limit: 10,
        hasPrevPage: false,
        hasNextPage: false
    }
}

const utilities = { 
    generateTableRowHTML: (item) => {
        return `
            <tr>
                <td>${item.id}</td>
                <td>${item.userId}</td>
                <td>${item.title}</td>
                <td>${item.body}</td>
            </tr>
        `
    }
}

const fetchData = async () => {
    try {
        const response = await fetch(API_URL, { method: "GET" });
        const result = await response.json();

        if (response.ok) {
            state._data = result;
        } else {
            throw new Error(result);
        }
    } catch (error) {
        console.log(error);
    }
}

const paginateData = () => {
    const startIndex = state.paginationInfo.limit * (state.paginationInfo.page - 1);

    state.paginationInfo.totalPages = Math.ceil(state._data.length / state.paginationInfo.limit);
    state.paginationInfo.hasPrevPage = state.paginationInfo.page > 1; 
    state.paginationInfo.hasNextPage = state.paginationInfo.page < state.paginationInfo.totalPages;

    state.data = [...state._data].splice(startIndex, state.paginationInfo.limit);

    $currentPageSpan.innerHTML = state.paginationInfo.page;
    $totalPagesSpan.innerHTML = state.paginationInfo.totalPages;

    if (state.paginationInfo.hasPrevPage) {
        $prevBtn.removeAttribute("disabled");
    } else {
        $prevBtn.setAttribute("disabled", true);
    }

    if (state.paginationInfo.hasNextPage) {
        $nextBtn.removeAttribute("disabled");
    } else {
        $nextBtn.setAttribute("disabled", true);
    }
}

const renderData = () => {
    const HTML = state.data.map(item => utilities.generateTableRowHTML(item)).join("");

    $tbody.innerHTML = HTML;
}

const render = () => {
    paginateData();
    renderData();
}

const setListeners = () => {
    $prevBtn.addEventListener("click", () => {
        if (state.paginationInfo.page > 1) {
            state.paginationInfo.page--;
            render();
        }
    });
    $nextBtn.addEventListener("click", () => {
        if (state.paginationInfo.page < state.paginationInfo.totalPages) {
            state.paginationInfo.page++;
            render();
        }
    });
}

const init = async () => {
    await fetchData();
    render();
    setListeners();
}

init();
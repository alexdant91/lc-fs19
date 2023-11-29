import  { utilities } from "./utilitis.mjs";

const $tbody = document.querySelector("#tbody");
const $prevBtn = document.querySelector("#prev");
const $nextBtn = document.querySelector("#next");
const $currentPageSpan = document.querySelector("#currentPage");
const $totalPagesSpan = document.querySelector("#totalPages");
const $limitSelect = document.querySelector("#limit"); 
const $sortBySelect = document.querySelector("#sortBy");
const $sortModeSelect = document.querySelector("#sortMode");
const $searchBySelect = document.querySelector("#searchBy");
const $searchQueryInput = document.querySelector("#searchQuery");
const $searchResult = document.querySelector("#searchResult");
const $restoreDataBtn = document.querySelector("#restoreData"); 

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const state = {
    data: [], //copia di rendering
    _data: [], //copia di cache
    paginationInfo: {
        page: 1,
        totalPages: 1,
        limit: $limitSelect.value,
        hasPrevPage: false,
        hasNextPage: false,
    },
    sortInfo: {
        sortBy: "id", // id or userId or title or body
        sortMode: "ASC" // ASC or DESC
    },
    searchInfo: {
        searchBy: "id", // id or userId or title or body
        searchQuery: ""
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
    // state.paginationInfo.limit = state.paginationInfo.limit;

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

const sortData = () => {
    utilities(state).sort[state.sortInfo.sortMode]();
}

const searchData = (event) => {
    if (event) {
        state.searchInfo.searchQuery = event.target.value;
    }
    state.data = [...state._data].filter((item) => {
        return item[state.searchInfo.searchBy].toString().match(new RegExp(state.searchInfo.searchQuery, "ig"));  //ig = insensitve global
    });

    if (state.searchInfo.searchQuery === "") {
        $searchResult.innerHTML = ``;
        render();
    } else {
        $searchResult.innerHTML = `${state.data.length} results found.`;
        renderData();
    }
}

const renderData = () => {
    const HTML = state.data.map(item => utilities(state).generateTableRowHTML(item)).join("");
    if (HTML == "") {
        $tbody.innerHTML = `
        <tr>
            <td colspan="5">Empty data</td>
        </tr>
        `;
    } else {
        $tbody.innerHTML = HTML;
    }
}

const render = () => {
    paginateData();
    sortData();
    renderData();
}

const restoreData = async () => {
    await fetchData();
    render();
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

    $limitSelect.addEventListener("change", (event) => {/////////
        state.paginationInfo.limit = isNaN(event.target.value) ? state._data.length : parseInt(event.target.value);
        state.paginationInfo.page = 1;
        render();
    });

    $sortBySelect.addEventListener("change", (event) => {
        state.sortInfo.sortBy = event.target.value;
        render();
    });

    $sortModeSelect.addEventListener("change", (event) => {
        state.sortInfo.sortMode = event.target.value;
        render();
    });

    $searchBySelect.addEventListener("change", (event) => {
        state.searchInfo.searchBy = event.target.value;
        searchData();
    });

    $searchQueryInput.addEventListener("input", (event) => {
        searchData(event);
    });

    $restoreDataBtn.addEventListener("click", restoreData);
}

const init = async () => {
    await fetchData();
    render();
    setListeners();
}

document.addEventListener("click", (event) => {

    if (event.target.classList.contains("remove-btn")) {
        const id = Number(event.target.dataset.id);
        state._data = state._data.filter((item) => item.id !== id);
        render();
    }
})

init();

document.querySelector("#click").addEventListener("click", (event) =>{

    if (event.target.classList.contains("active")) {
        event.target.classList.remove("active");
    }else{
        event.target.classList.add("active");
    }
});


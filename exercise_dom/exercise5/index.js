const $tbody = document.querySelector("#tbody");

const API_URL = "https://jsonplaceholder.typicode.com/photos";

const state = {
  data: [],
};

const utilities = {
  tableGenerateHTML: (item) => {
    return `
        <tr>
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td><img src="${item.thumbnailUrl}"></td>
        </tr>
        `;
  },
};

const fetchData = async () => {
  try {
    const response = await fetch(API_URL, { method: "GET" });
    const result = await response.json();
    console.log(result);
    if (response.ok) {
      state.data = result;
    } else {
      throw new Error(result);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const renderData = () => {
  const HTML = state.data.map((item) => utilities.tableGenerateHTML(item)).join("");

  $tbody.innerHTML = HTML;
};

const init = async () => {
  await fetchData();
  renderData();
};

init();
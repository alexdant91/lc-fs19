const $tbody = document.querySelector("#tbody");

const API_URL = "https://jsonplaceholder.typicode.com/albums";

const state = {
  data: [],
};

const utilities = {
  renderTableHTML: (item) => {
    return `
        <tr>
        <td>${item.userId}</td>
        <td>${item.id}</td>
        <td>${item.title}</td>
        </tr>
        `;
  },
};

const fetchData = async () => {
  try {
    const response = await fetch(API_URL, { method: "GET" });
    const result = await response.json();

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
  const HTML = state.data
    .map((item) => utilities.renderTableHTML(item))
    .join("");

  $tbody.innerHTML = HTML;
};

const init = async () => {
  await fetchData();
  renderData();
};

init();

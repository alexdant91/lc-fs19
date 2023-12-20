const $tbody = document.querySelector("#tbody");

const API_URL = "https://dummyjson.com/todos";

const state = {
  data: [],
};

const utilities = {
  tablerenderHTML: (item) => {
    return `
        <tr>
        <td>${item.id}</td>
        <td>${item.todo}</td>
        <td>${item.completed ? "yes" : "no"}</td>
        <td>${item.userId}</td>
        </tr>
        `;
  },
};

const fetchData = async () => {
  try {
    const responce = await fetch(API_URL, { method: "GET" });
    const result = await responce.json();
    if (responce.ok) {
      state.data = result.todos;
      console.log(state.data);
    } else {
      throw new Error(result);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const renderData = () => {
  const HTML = state.data.map((item) => utilities.tablerenderHTML(item)).join("");

  $tbody.innerHTML = HTML;
};

const init = async () => {
  await fetchData();
  renderData();
};

init();

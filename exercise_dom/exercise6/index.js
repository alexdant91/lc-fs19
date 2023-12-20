const $section = document.querySelector("#sec");

const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=151";

const state = {
  data: [],
};

const fetchData = async () => {
  try {
    const response = await fetch(API_URL, { method: "GET" });
    const result = await response.json();

    const pokemons = await Promise.all(
      result.results.map(async (item) => {
        const response2 = await fetch(item.url, { method: "GET" });
        const result2 = await response2.json();
        return result2;
      })
    );
    if (response.ok) {
      state.data = pokemons;
    } else {
      throw new Error(result);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const utilities = {
  cardRenderHTML: (item) => {
    return `
        <div class="flex flex-col items-center justify-center w-[95px]">
        <img src="${item.sprites.front_default}" />
        <strong>${item.name}</strong>
        <p>${item.types.map((element) => element.type.name).join(", ")}</p>
        </div>
        `;
  },
};

const renderData = () => {
  const HTML = state.data
    .map((item) => utilities.cardRenderHTML(item))
    .join("");

  $section.innerHTML = HTML;
};

const init = async () => {
  await fetchData();
  renderData();
};

init();
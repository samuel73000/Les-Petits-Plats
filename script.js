import { displayData } from "./js/display.js";
import { fetchData } from "./js/api.js";
//  import {filtrageInput}
// let globalData = null;
// 20;

const globalData = await fetchData();
let filteredData = [];
let tagsIngredients = [];
let tagsUstensils = [];

function init() {
  displayData(globalData);
}
init();

const input = document.querySelector(".input-search");

// Add event listener to the input element
input.addEventListener("input", (e) => {
  sou;
  const dataFiltrees = filtrageInput(e.target.value);
  displayData(dataFiltrees);
});

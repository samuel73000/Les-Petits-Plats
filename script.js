// Ce fichier script.js sert de point d'entrée pour l'initialisation et la gestion des interactions dans l'application.
// Il importe et utilise des fonctions depuis d'autres modules pour afficher et filtrer les données.

// Importation de la fonction displayData depuis le fichier display.js
import { displayData, SelectFilterTag } from "./js/display.js";

// Importation de la fonction fetchData depuis le fichier api.js
import { fetchData } from "./js/api.js";

// Importation de la fonction filtrageInput
import { filtrageInput } from "./js/filtrage.js";

//// Importation de la fonction filtrageTaginput
import { filtreTagIngredient } from "./js/filtrageTag.js";



// Appel asynchrone à fetchData pour récupérer les données et les stocker dans globalData
const globalData = await fetchData();

// appel a filtrage.js pour recuperer le data filtrer du main input
const boutonInputHeader = document.querySelector(".bouton-input-header");//on recupere l'input
// let filteredDataMainInput = filtrageInput(globalData);// on stock le return de la function filtrageInput


let filteredDataMainInput = []; // Initialize globally
let filteredDataInputTags = []; // Initialize globally

function init() {
  // Display initial data
  displayData(globalData);
  SelectFilterTag(globalData);

  // Event listener for main input button
  boutonInputHeader.addEventListener("click", () => {
    // Update the filtered data from main input
    filteredDataMainInput = filtrageInput(globalData);

    if (filteredDataMainInput.length === 0) { 
      // Display initial data if no data was filtered
      displayData(globalData);
      SelectFilterTag(globalData);
    } else {
      // Display filtered data if data was filtered
      displayData(filteredDataMainInput); // Update recipe cards
      SelectFilterTag(filteredDataMainInput); // Update tags
    }

    // Inside this event listener, we add another event listener for the tag input
    const inputSubit = document.querySelectorAll(".loupe-for-input");
    inputSubit[0].addEventListener("click", () => {
      // Filter tags based on the current main input filtered data
      const dataToFilter = filteredDataMainInput.length === 0 ? globalData : filteredDataMainInput;
      filteredDataInputTags = filtreTagIngredient(dataToFilter);

      if (filteredDataInputTags.length === 0) {
        // If no tags were filtered, use the current main input filtered data
        SelectFilterTag(dataToFilter);
      } else {
        // Display filtered tags
        SelectFilterTag(dataToFilter, filteredDataInputTags);
      }
    });
  });
}

init();


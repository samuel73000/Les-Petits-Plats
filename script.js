// Ce fichier script.js sert de point d'entrée pour l'initialisation et la gestion des interactions dans l'application.
// Il importe et utilise des fonctions depuis d'autres modules pour afficher et filtrer les données.

// Importation de la fonction displayData depuis le fichier display.js
import { displayData, SelectFilterTagIngredients , SelectFilterTagUstensiles ,SelectFilterTagAppliance} from "./js/display.js";

// Importation de la fonction fetchData depuis le fichier api.js
import { fetchData } from "./js/api.js";

// Importation de la fonction filtrageInput
import { filtrageInput } from "./js/filtrage.js";

// Importation de la fonction filtrageTaginput
import { filtreTagIngredient ,filtreTagUstensiles ,filtreTagAppliance } from "./js/filtrageTag.js";



// Appel asynchrone à fetchData pour récupérer les données et les stocker dans globalData
const globalData = await fetchData();


const boutonInputHeader = document.querySelector(".bouton-input-header");// on recupere le btn pour submit les filtres 


let filteredDataMainInput = []; // Initialize globally
let filteredDataInputTags = []; // Initialize globally

function init() {
  // Display initial data
  displayData(globalData);
  SelectFilterTagIngredients(globalData);
  SelectFilterTagUstensiles(globalData);
  SelectFilterTagAppliance(globalData);
  // Event listener for main input button
    // Event listener for main input button
    boutonInputHeader.addEventListener("click", () => {
      // Update the filtered data from main input
      filteredDataMainInput = filtrageInput(globalData);
    
      if (filteredDataMainInput.length === 0) { 
      // Display initial data if no data was filtered
      displayData(globalData);
      SelectFilterTagIngredients(globalData);
      SelectFilterTagUstensiles(globalData);
      SelectFilterTagAppliance(globalData);
      } else {
      // Display filtered data if data was filtered
      displayData(filteredDataMainInput); // Update recipe cards
      SelectFilterTagIngredients(filteredDataMainInput); // Update tags
      SelectFilterTagUstensiles(filteredDataMainInput);
      SelectFilterTagAppliance(filteredDataMainInput);
      }
    
      // Add event listeners for the tags inside the main input event listener
      const inputSubit = document.querySelectorAll(".loupe-for-input");
      inputSubit.forEach((input, index) => {
      input.addEventListener("click", () => {
        // Filter tags based on the current main input filtered data
        const dataToFilter = filteredDataMainInput.length === 0 ? globalData : filteredDataMainInput;
        filteredDataInputTags = tagFilters[index].filterFunction(dataToFilter);
    
        if (filteredDataInputTags.length === 0) {
        // If no tags were filtered, use the current main input filtered data
        tagFilters[index].selectFunction(dataToFilter);
        } else {
        // Display filtered tags
        tagFilters[index].selectFunction(dataToFilter, filteredDataInputTags);
        }
      });
      });
    });



    const inputSubit = document.querySelectorAll(".loupe-for-input"); // on recupere les loupes pour subit les tags
    const tagFilters = [
      { filterFunction: filtreTagIngredient, selectFunction: SelectFilterTagIngredients },
      { filterFunction: filtreTagUstensiles, selectFunction: SelectFilterTagUstensiles },
      { filterFunction: filtreTagAppliance, selectFunction: SelectFilterTagAppliance }
    ];

    inputSubit.forEach((input, index) => {
      input.addEventListener("click", () => {
        // Filter tags based on the current main input filtered data
        const dataToFilter = filteredDataMainInput.length === 0 ? globalData : filteredDataMainInput;
        filteredDataInputTags = tagFilters[index].filterFunction(dataToFilter);

        if (filteredDataInputTags.length === 0) {
          // If no tags were filtered, use the current main input filtered data
          tagFilters[index].selectFunction(dataToFilter);
        } else {
          // Display filtered tags
          tagFilters[index].selectFunction(dataToFilter, filteredDataInputTags);
        }
      });
    });






}

init();


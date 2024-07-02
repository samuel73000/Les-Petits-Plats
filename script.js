// // Ce fichier script.js sert de point d'entrée pour l'initialisation et la gestion des interactions dans l'application.
// Il importe et utilise des fonctions depuis d'autres modules pour afficher et filtrer les données.

// Importation de la fonction displayData depuis le fichier display.js
import {
  displayData,
  SelectFilterTagIngredients,
  SelectFilterTagUstensiles,
  SelectFilterTagAppliance,
} from "./js/display.js";

// Importation de la fonction fetchData depuis le fichier api.js
import { fetchData } from "./js/api.js";

// Importation de la fonction filtrageInput
import { filtrageInput, messageErreur } from "./js/filtrage.js";

// Importation de la fonction filtrageTaginput
import {
  filtreTagIngredient,
  filtreTagUstensiles,
  filtreTagAppliance,
  filtreTagRecetteIngredient,
  filtreTagRecetteUstensiles,
  filtreTagRecetteAppliance,
  filteredDataTag,
} from "./js/filtrageTag.js";

// Appel asynchrone à fetchData pour récupérer les données et les stocker dans globalData
const globalData = await fetchData();

const boutonInputHeader = document.querySelector(".bouton-input-header"); // on recupere le btn pour submit les filtres
const inputHeader = document.querySelector(".input-header"); // on recupere l'input pour les filtres
const containerFilteredtTag = document.querySelector(".container-filtered-tag"); // on recupere le container pour les tags filtres

export let filteredDataMainInput = []; // Initialize globally
let filteredDataInputTags = []; // Initialize globally

function init() {
  // on fait apparaitre les recettes
  displayData(globalData);
  // on fait apparaitre les tags et on actie les filtre dans les input
  SelectFilterTagIngredients(globalData);
  SelectFilterTagUstensiles(globalData);
  SelectFilterTagAppliance(globalData);
  // //function pour filtrer les recettes avec les tags

  filtreTagRecetteIngredient(globalData);
  filtreTagRecetteUstensiles(globalData);
  filtreTagRecetteAppliance(globalData);

  // addeventlistener pour le main input
  boutonInputHeader.addEventListener("click", () => {
    // Update the filtered data from main input
    filteredDataMainInput = filtrageInput(globalData);


    // permet de filtrer avec input quand on a deja filtre avec tags
    if (filteredDataTag.length !== 0 && inputHeader.value.length !== 0) {
      filteredDataMainInput = filtrageInput(filteredDataTag);
      displayData(filteredDataMainInput);
    }

    //  filtrer avec tag quand on a deja filtrer avec input main
    if (filteredDataMainInput.length === 0) {
      displayData(globalData);

      SelectFilterTagIngredients(globalData);
      SelectFilterTagUstensiles(globalData);
      SelectFilterTagAppliance(globalData);

      filtreTagRecetteIngredient(globalData);
      filtreTagRecetteUstensiles(globalData);
      filtreTagRecetteAppliance(globalData);
    }if(filteredDataMainInput.length !== 0){
      displayData(filteredDataMainInput);

      SelectFilterTagIngredients(filteredDataMainInput);
      SelectFilterTagUstensiles(filteredDataMainInput);
      SelectFilterTagAppliance(filteredDataMainInput);

      filtreTagRecetteIngredient(filteredDataMainInput);
      filtreTagRecetteUstensiles(filteredDataMainInput);
      filtreTagRecetteAppliance(filteredDataMainInput);
    }

    if (filteredDataMainInput.length !== 0|| filteredDataTag.length !== 0 ) {
      displayData(filteredDataMainInput);

      SelectFilterTagIngredients(filteredDataMainInput);
      SelectFilterTagUstensiles(filteredDataMainInput);
      SelectFilterTagAppliance(filteredDataMainInput);

      filtreTagRecetteIngredient(filteredDataMainInput);
      filtreTagRecetteUstensiles(filteredDataMainInput);
      filtreTagRecetteAppliance(filteredDataMainInput);
    }

    
     // si on filtre avec tag puis avec input et que on supp input on revien au filtre tag
     if (inputHeader.value.length === 0 && filteredDataTag.length !== 0) {
      displayData(filteredDataTag);
      SelectFilterTagIngredients(filteredDataTag);
      SelectFilterTagUstensiles(filteredDataTag);
      SelectFilterTagAppliance(filteredDataTag);

      filtreTagRecetteIngredient(filteredDataTag);
      filtreTagRecetteUstensiles(filteredDataTag);
      filtreTagRecetteAppliance(filteredDataTag);
    }
     // si on aucun resulat on affiche un message d'erreur
     if (filteredDataMainInput.length ===0 &&containerFilteredtTag.children.length === 0 ) {
      messageErreur(); // Affiche le message d'erreur
      filteredDataMainInput = filtrageInput(filteredDataTag);

      SelectFilterTagIngredients(filteredDataMainInput);

      SelectFilterTagUstensiles(filteredDataMainInput);

      SelectFilterTagAppliance(filteredDataMainInput);
      filtreTagRecetteIngredient(filteredDataMainInput);
      filtreTagRecetteUstensiles(filteredDataMainInput);
      filtreTagRecetteAppliance(filteredDataMainInput);
    }
if (
      inputHeader.value.length <3 &&
      containerFilteredtTag.children.length === 0
    ) {
      window.location.reload();
    }



    ////////ajoute addeventlistener pour les input des tags une fois que on a filter avec main input////////
    document.addEventListener("DOMContentLoaded", () => {
      const inputSubit = document.querySelectorAll(".loupe-for-input");

      inputSubit.forEach((input, index) => {
        input.addEventListener("click", (event) => {
          event.stopPropagation();
          event.preventDefault();

          const dataToFilter =
            filteredDataMainInput.length === 0
              ? globalData
              : filteredDataMainInput;
          filteredDataInputTags =
            tagFilters[index].filterFunction(dataToFilter);

          if (filteredDataInputTags.length === 0) {
            tagFilters[index].selectFunction(dataToFilter);
          } else {
            tagFilters[index].selectFunction(
              dataToFilter,
              filteredDataInputTags
            );
          }

          // Met à jour uniquement le contenu des tags dans le modal sans le recréer
          createFilterElements(
            globalData,
            filteredDataInputTags,
            index,
            tagFilters[index].type
          );
        });
      });
    });
  });

  /////// ajouter addeventlistener pour les input des tags avant que on filtre avec input principal/////////////
  const tagFilters = [
    {
      filterFunction: filtreTagIngredient,
      selectFunction: SelectFilterTagIngredients,
    },
    {
      filterFunction: filtreTagUstensiles,
      selectFunction: SelectFilterTagUstensiles,
    },
    {
      filterFunction: filtreTagAppliance,
      selectFunction: SelectFilterTagAppliance,
    },
  ];
  function handleLoupeForInputClick(event) {
    // Vérifie si l'élément cliqué est un loupe-for-input dans votre modal
    if (event.target.classList.contains("loupe-for-input")) {
      // Empêche le comportement par défaut du clic

      const inputSelect = document.querySelectorAll(".input-select");
      const inputValues = Array.from(inputSelect)
        .map((input) => input.value.toLowerCase().trim())
        .filter((value) => value !== "");

      // Trouver l'index de l'élément cliqué parmi tous les loupe-for-input
      const index = Array.from(
        document.querySelectorAll(".loupe-for-input")
      ).indexOf(event.target);

      // Vérifie si l'index est valide
      if (index !== -1 && index < tagFilters.length) {
        // Filter tags based on the current main input filtered data or global data if no filter applied
        const dataToFilter =
          inputValues.length === 0
            ? filteredDataMainInput.length === 0
              ? globalData
              : filteredDataMainInput
            : globalData;
        filteredDataInputTags = tagFilters[index].filterFunction(dataToFilter);

        if (filteredDataInputTags.length === 0) {
          // If no tags were filtered, use the current main input filtered data or global data
          tagFilters[index].selectFunction(dataToFilter);
        } else {
          // Display filtered tags
          tagFilters[index].selectFunction(dataToFilter, filteredDataInputTags);
        }
      } else {
        console.error(`Invalid index ${index}.`);
      }
    }
  }
  // Ajouter l'écouteur d'événements avec la fonction définie
  document.addEventListener("click", handleLoupeForInputClick);
}

init();
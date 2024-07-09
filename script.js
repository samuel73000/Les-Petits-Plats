// Ce fichier script.js sert de point d'entrée pour l'initialisation et la gestion des interactions dans l'application.
// Il importe et utilise des fonctions depuis d'autres modules pour afficher et filtrer les données.

// Importation des fonctions nécessaires depuis d'autres modules
import {
  displayData,
  SelectFilterTagIngredients,
  SelectFilterTagUstensiles,
  SelectFilterTagAppliance,
} from "./js/display.js";
import { fetchData } from "./js/api.js";
import { filtrageInput, messageErreur } from "./js/filtrage.js";
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

// Sélection des éléments DOM pour l'interaction utilisateur
const boutonInputHeader = document.querySelector(".bouton-input-header");
const inputHeader = document.querySelector(".input-header");
const containerFilteredtTag = document.querySelector(".container-filtered-tag");

// Variables globales pour stocker les données filtrées
export let filteredDataMainInput = [];
let filteredDataInputTags = [];

// Fonction d'initialisation
function init() {
  // Affiche les données initiales
  displayData(globalData);

  // Affiche et active les filtres pour les tags
  SelectFilterTagIngredients(globalData);
  SelectFilterTagUstensiles(globalData);
  SelectFilterTagAppliance(globalData);

  // Filtrage des recettes avec les tags
  filtreTagRecetteIngredient(globalData);
  filtreTagRecetteUstensiles(globalData);
  filtreTagRecetteAppliance(globalData);

  // Écouteur d'événement pour le bouton de filtre principal
  boutonInputHeader.addEventListener("click", handleMainInputFilter);

  // Ajoute des écouteurs d'événements pour les inputs des tags avant filtrage principal
  document.addEventListener("click", handleLoupeForInputClick);
}

// Fonction pour gérer le filtrage via l'input principal
function handleMainInputFilter() {
  // Met à jour les données filtrées depuis l'input principal
  filteredDataMainInput = filtrageInput(globalData);

  // Filtrage avec input après filtrage avec tags
  if (filteredDataTag.length !== 0 && inputHeader.value.length !== 0) {
    filteredDataMainInput = filtrageInput(filteredDataTag);
    displayData(filteredDataMainInput);
  }

  // Réinitialise l'affichage si aucune donnée filtrée
  if (filteredDataMainInput.length === 0) {
    resetDisplay();
  } else {
    updateDisplay(filteredDataMainInput);
  }

  // Filtrage par tag après filtrage principal
  if (filteredDataMainInput.length !== 0 || filteredDataTag.length !== 0) {
    updateDisplay(filteredDataMainInput);
  }

  // Affichage des données filtrées par tags si l'input est vidé
  if (inputHeader.value.length === 0 && filteredDataTag.length !== 0) {
    updateDisplay(filteredDataTag);
  }

  // Affichage d'un message d'erreur si aucun résultat
  if (filteredDataMainInput.length === 0) {
    messageErreur();
  }

  // Recharger la page si les critères sont remplis
  if (inputHeader.value.length < 3 && containerFilteredtTag.children.length === 0) {
    window.location.reload();
  }



  ////////////////////////// input pour les tag /////////////////////////
  // Ajout des écouteurs d'événements pour les inputs des tags après filtrage principal
  document.addEventListener("DOMContentLoaded", () => {
    const inputSubit = document.querySelectorAll(".loupe-for-input");
    inputSubit.forEach((input, index) => {
      input.addEventListener("click", (event) => {
        event.stopPropagation();
        event.preventDefault();

        const dataToFilter = filteredDataMainInput.length === 0 ? globalData : filteredDataMainInput;
        filteredDataInputTags = tagFilters[index].filterFunction(dataToFilter);

        if (filteredDataInputTags.length === 0) {
          tagFilters[index].selectFunction(dataToFilter);
        } else {
          tagFilters[index].selectFunction(dataToFilter, filteredDataInputTags);
        }

        createFilterElements(globalData, filteredDataInputTags, index, tagFilters[index].type);
      });
    });
  });
}

// Fonction pour réinitialiser l'affichage des données
function resetDisplay() {
  displayData(globalData);
  SelectFilterTagIngredients(globalData);
  SelectFilterTagUstensiles(globalData);
  SelectFilterTagAppliance(globalData);
  filtreTagRecetteIngredient(globalData);
  filtreTagRecetteUstensiles(globalData);
  filtreTagRecetteAppliance(globalData);
}

// Fonction pour mettre à jour l'affichage des données
function updateDisplay(data) {
  displayData(data);
  SelectFilterTagIngredients(data);
  SelectFilterTagUstensiles(data);
  SelectFilterTagAppliance(data);
  filtreTagRecetteIngredient(data);
  filtreTagRecetteUstensiles(data);
  filtreTagRecetteAppliance(data);
}

// Fonction pour gérer les clics sur les loupes des inputs de tags
function handleLoupeForInputClick(event) {
  if (event.target.classList.contains("loupe-for-input")) {
    const inputSelect = document.querySelectorAll(".input-select");
    const inputValues = Array.from(inputSelect).map(input => input.value.toLowerCase().trim()).filter(value => value !== "");

    const index = Array.from(document.querySelectorAll(".loupe-for-input")).indexOf(event.target);

    if (index !== -1 && index < tagFilters.length) {
      const dataToFilter = inputValues.length === 0 ? (filteredDataMainInput.length === 0 ? globalData : filteredDataMainInput) : globalData;
      filteredDataInputTags = tagFilters[index].filterFunction(dataToFilter);

      if (filteredDataInputTags.length === 0) {
        tagFilters[index].selectFunction(dataToFilter);
      } else {
        tagFilters[index].selectFunction(dataToFilter, filteredDataInputTags);
      }
    } else {
      console.error(`Invalid index ${index}.`);
    }
  }
}

// Tableau de fonctions pour le filtrage des tags
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

// Initialisation de l'application
init();


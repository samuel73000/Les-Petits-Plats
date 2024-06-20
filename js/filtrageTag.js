import {
  displayData,
  SelectFilterTagIngredients,
  SelectFilterTagUstensiles,
  SelectFilterTagAppliance,
} from "./display.js";

///////////////////////Filtre des Tags grace a leur input ////////////////////

// Fonction de filtrage par ingrédients
export function filtreTagIngredient(data) {
  const inputSelect = document.querySelectorAll(".input-select");
  const inputValues = Array.from(inputSelect)
    .map((input) => input.value.toLowerCase().trim())
    .filter((value) => value !== "");
  let filteredIngredients = [];
  data.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      inputValues.forEach((inputValue) => {
        if (
          ingredient.ingredient.toLowerCase().includes(inputValue) &&
          !filteredIngredients.includes(ingredient.ingredient) &&
          !filteredIngredients.includes(ingredient.ingredient.toLowerCase())
        ) {
          filteredIngredients.push(ingredient.ingredient);
        }
      });
    });
  });
  return filteredIngredients;
}

// Fonction de filtrage par ustensiles
export function filtreTagUstensiles(data) {
  const inputSelect = document.querySelectorAll(".input-select");
  const inputValues = Array.from(inputSelect)
    .map((input) => input.value.toLowerCase().trim())
    .filter((value) => value !== "");
  let filteredUstensils = [];
  data.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      inputValues.forEach((inputValue) => {
        if (
          ustensil.toLowerCase().includes(inputValue) &&
          !filteredUstensils.includes(ustensil)
        ) {
          filteredUstensils.push(ustensil);
        }
      });
    });
  });
  return filteredUstensils;
}

// Fonction de filtrage par appareil
export function filtreTagAppliance(data) {
  const inputSelect = document.querySelectorAll(".input-select");
  const inputValues = Array.from(inputSelect)
    .map((input) => input.value.toLowerCase().trim())
    .filter((value) => value !== "");
  let filteredAppliances = [];
  data.forEach((recipe) => {
    inputValues.forEach((inputValue) => {
      if (
        recipe.appliance.toLowerCase().includes(inputValue) &&
        !filteredAppliances.includes(recipe.appliance)
      ) {
        filteredAppliances.push(recipe.appliance);
      }
    });
  });
  return filteredAppliances;
}

////////////////////// filtrer les recettes grace a tags////////////////////////////////////
export let filteredDataTag = []; // Initialisation des données filtrées
let activeFilters = []; // Liste des filtres actifs

// Fonction de filtrage par ingrédients
export function filtreTagRecetteIngredient(data) {
  const containerTag = document.querySelector(".div-modal-select-ingredient");

  containerTag.addEventListener("click", (event) => {
    if (event.target.classList.contains("p-select-tag")) {
      const searchText = event.target.textContent.trim().toLowerCase();
      toggleFilter(searchText, data, 'ingredient');
    }
  });
}

// Fonction de filtrage par ustensiles
export function filtreTagRecetteUstensiles(data) {
  const containerTag = document.querySelector(".div-modal-select-ustensil");

  containerTag.addEventListener("click", (event) => {
    if (event.target.classList.contains("p-select-tag")) {
      const searchText = event.target.textContent.trim().toLowerCase();
      toggleFilter(searchText, data, 'ustensil');
    }
  });
}

// Fonction de filtrage par appareil
export function filtreTagRecetteAppliance(data) {
  const containerTag = document.querySelector(".div-modal-select-appliance");

  containerTag.addEventListener("click", (event) => {
    if (event.target.classList.contains("p-select-tag")) {
      const searchText = event.target.textContent.trim().toLowerCase();
      toggleFilter(searchText, data, 'appliance');
    }
  });
}

// Fonction pour ajouter ou supprimer un filtre
function toggleFilter(element, data, type) {
  // Vérifier si le filtre est déjà actif
  const index = activeFilters.findIndex(filter => filter.element === element && filter.type === type);

  if (index === -1) {
    // Ajouter le filtre à activeFilters
    activeFilters.push({ element, type });
    addCardFiltreTag(element, data);
  } else {
    // Supprimer le filtre de activeFilters
    activeFilters = activeFilters.filter(filter => !(filter.element === element && filter.type === type));
    removeCardFiltreTag(element);
  }

  // Filtrer les données en fonction des filtres actifs
  filteredDataTag = applyFilters(data, activeFilters);

  // Mettre à jour l'affichage des données filtrées
  displayData(filteredDataTag);
  SelectFilterTagIngredients(filteredDataTag);
  SelectFilterTagUstensiles(filteredDataTag);
  SelectFilterTagAppliance(filteredDataTag);
}

// Fonction pour appliquer les filtres actifs
function applyFilters(data, filters) {
  if (filters.length === 0) {
    return data; // Si aucun filtre actif, retourner toutes les recettes
  }
  return data.filter((recipe) => {
    return filters.every(filter => {
      switch (filter.type) {
        case 'ingredient':
          return recipe.ingredients && recipe.ingredients.some(ingredient =>
            ingredient.ingredient.toLowerCase().includes(filter.element)
          );
        case 'ustensil':
          return recipe.ustensils && recipe.ustensils.some(ustensil =>
            ustensil.toLowerCase().includes(filter.element)
          );
        case 'appliance':
          return recipe.appliance && recipe.appliance.toLowerCase().includes(filter.element);
        default:
          return false;
      }
    });
  });
}

// Fonction pour ajouter une carte filtrée
function addCardFiltreTag(element, data) {
  const sectionTagFiltered = document.querySelector(".container-filtered-tag");

  // Vérifier si une carte pour ce filtre existe déjà
  if (!Array.from(sectionTagFiltered.children).some(card => card.querySelector(".p-card-filtered-tag").textContent === element)) {
    const divCard = document.createElement("div");
    divCard.classList.add("div-card-filtered-tag");
    sectionTagFiltered.appendChild(divCard);

    const pCard = document.createElement("p");
    pCard.classList.add("p-card-filtered-tag");
    pCard.textContent = element;
    divCard.appendChild(pCard);

    const croixCard = document.createElement("i");
    croixCard.classList.add("fa-solid", "fa-xmark", "croix-card-filtered-tag");
    divCard.appendChild(croixCard);

    croixCard.addEventListener("click", () => {
      divCard.remove(); // Supprime seulement la carte spécifique

      // Supprimer le filtre correspondant de activeFilters
      activeFilters = activeFilters.filter(filter => !(filter.element === element));

      // Filtrer les données en fonction des filtres actifs restants
      filteredDataTag = applyFilters(data, activeFilters);

      // Mettre à jour l'affichage des données filtrées
      displayData(filteredDataTag);
      SelectFilterTagIngredients(filteredDataTag);
      SelectFilterTagUstensiles(filteredDataTag);
      SelectFilterTagAppliance(filteredDataTag);
    });
  }
}

// Fonction pour supprimer une carte filtrée
function removeCardFiltreTag(element) {
  const cards = document.querySelectorAll(".div-card-filtered-tag");
  cards.forEach(card => {
    if (card.querySelector(".p-card-filtered-tag").textContent === element) {
      card.remove();
    }
  });
}









































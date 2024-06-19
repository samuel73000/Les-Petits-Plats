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






// //////////////////// filtrer les recettes grace a tags////////////////////////////////////
export let filteredDataTag = [];

// Fonction de filtrage par ingrédients
export function filtreTagRecetteIngredient(data) {
  const containerTag = document.querySelector(".div-modal-select-ingredient");

  containerTag.addEventListener("click", (event) => {
    if (event.target.classList.contains("p-select-tag")) {
      const searchText = event.target.textContent.trim().toLowerCase();

      const sourceData = filteredDataTag.length > 0 ? filteredDataTag : data;

      filteredDataTag = sourceData.filter((recipe) => {
        if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
          return recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(searchText)
          );
        }
        return false;
      });

      displayData(filteredDataTag);
      SelectFilterTagIngredients(filteredDataTag);
      SelectFilterTagUstensiles(filteredDataTag);
      SelectFilterTagAppliance(filteredDataTag);
    }
  });
}
// Fonction de filtrage par ustensiles
export function filtreTagRecetteUstensiles(data) {
  const containerTag = document.querySelector(".div-modal-select-ustensil");

  containerTag.addEventListener("click", (event) => {
    if (event.target.classList.contains("p-select-tag")) {
      const searchText = event.target.textContent.trim().toLowerCase(); // Assurez-vous que le texte est en minuscules
      const sourceData = filteredDataTag.length > 0 ? filteredDataTag : data;

      filteredDataTag = sourceData.filter((recipe) => {
        if (recipe.ustensils && Array.isArray(recipe.ustensils)) {
          return recipe.ustensils.some((ustensil) =>
            ustensil.toLowerCase().includes(searchText)
          );
        }
        return false;
      });

      displayData(filteredDataTag);
      SelectFilterTagIngredients(filteredDataTag);
      SelectFilterTagUstensiles(filteredDataTag);
      SelectFilterTagAppliance(filteredDataTag);

    }
  });
}

// Fonction de filtrage par appareil
export function filtreTagRecetteAppliance(data) {
  const containerTag = document.querySelector(".div-modal-select-appliance");

  containerTag.addEventListener("click", (event) => {
    if (event.target.classList.contains("p-select-tag")) {
      const searchText = event.target.textContent.trim().toLowerCase(); // Assurez-vous que le texte est en minuscules
      const sourceData = filteredDataTag.length > 0 ? filteredDataTag : data;

      filteredDataTag = sourceData.filter((recipe) => {
        if (recipe.appliance && typeof recipe.appliance === "string") {
          return recipe.appliance.toLowerCase().includes(searchText);
        }
        return false;

      });

      displayData(filteredDataTag);
      SelectFilterTagIngredients(filteredDataTag);
      SelectFilterTagUstensiles(filteredDataTag);
      SelectFilterTagAppliance(filteredDataTag);
    }
  });
}



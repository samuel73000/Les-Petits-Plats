import {displayData ,SelectFilterTagIngredients ,SelectFilterTagUstensiles , SelectFilterTagAppliance} from "./display.js";

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

//////////////////// filtrer les recettes grace a tags////////////////////////////////////

// Fonction de filtrage par ingrédients
export function filtreTagReacetteIngredient(data) {
  const containerTag = document.querySelectorAll(
    ".div-modal-select-ingredient .p-select-tag"
  );
  containerTag.forEach((tag) => {
    tag.addEventListener("click", () => {
      const searchText = tag.textContent.trim().toLowerCase(); // Assurez-vous que le texte est en minuscules
      let filteredData = data.filter((recipe) => {
        // Vérifiez si recipe.ingredients est défini et est un tableau
        if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
          // Vérifiez si searchText est inclus dans les noms d'ingrédients
          return recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(searchText)
          );
        }
        return false;
      });
      displayData(filteredData);
      SelectFilterTagIngredients(filteredData);
      SelectFilterTagUstensiles(filteredData);
      SelectFilterTagAppliance(filteredData);
    });
  });
}

// Fonction de filtrage par Ustensiles
export function filtreTagReacetteUstensiles(data) {
  const containerTag = document.querySelectorAll(
    ".div-modal-select-ustensil .p-select-tag"
  );
  containerTag.forEach((tag) => {
    tag.addEventListener("click", () => {
      const searchText = tag.textContent.trim().toLowerCase(); // Assurez-vous que le texte est en minuscules
      let filteredData = data.filter((recipe) => {
        // Vérifiez si recipe.ingredients est défini et est un tableau
        if (recipe.ustensils && Array.isArray(recipe.ustensils)) {
          // Vérifiez si searchText est inclus dans les noms d'ingrédients
          return recipe.ustensils.some((ustensils) =>
            ustensils.toLowerCase().includes(searchText)
          );
        }
        return false;
      });
      displayData(filteredData);
      SelectFilterTagIngredients(filteredData);
      SelectFilterTagUstensiles(filteredData);
      SelectFilterTagAppliance(filteredData);
    });
  });
}

// Fonction de filtrage par appareil
export function filtreTagReacetteAppliance(data) {
  const containerTag = document.querySelectorAll(
    ".div-modal-select-appliance .p-select-tag"
  );
  containerTag.forEach((tag) => {
    tag.addEventListener("click", () => {
      const searchText = tag.textContent.trim().toLowerCase(); // Assurez-vous que le texte est en minuscules
      let filteredData = data.filter((recipe) => {
        // Vérifiez si recipe.appliance est défini et est une chaîne de caractères
        if (recipe.appliance && typeof recipe.appliance === "string") {
          // Vérifiez si searchText est inclus dans le nom de l'appareil
          return recipe.appliance.toLowerCase().includes(searchText);
        }
        return false;
      });
      displayData(filteredData);
      SelectFilterTagIngredients(filteredData);
      SelectFilterTagUstensiles(filteredData);
      SelectFilterTagAppliance(filteredData);
    });
  });
}

import { displayData } from "../js/display.js";


let value = ""; // Déclaration d'une variable pour stocker la valeur de l'input
let filteredDataInput = [];
export function filtrageInput(globalData) {
  // Sélection des éléments du DOM pour l'input et le bouton
  const inputMain = document.querySelector(".input-header");

  // Récupération de la valeur de l'input
  value = inputMain.value; // Déclaration d'un tableau pour stocker les données filtrées
  
  // Vérification que la valeur saisie contient au moins 3 caractères
  if (value.length >= 3) {
    // Filtrage des données par nom
    let filteredByName = globalData.filter(
      (item) => item.name.toLowerCase().includes(value.toLowerCase()) // Si le nom de la recette contient la valeur saisie, alors le push dans le tableau filteredData
    );

    // Filtrage des données par description
    let filteredByDescription = globalData.filter(
      (item) => item.description.toLowerCase().includes(value.toLowerCase()) // Si la description de la recette contient la valeur saisie, alors le push dans le tableau filteredData
    );

    // Filtrage des données par ingrédients
    let filteredByIngredients = globalData.filter(
      (item) =>
        item.ingredients.some(
          (ingredient) =>
            ingredient.ingredient.toLowerCase().includes(value.toLowerCase()) // Si les ingrédients de la recette contiennent la valeur saisie, alors le push dans le tableau filteredData
        )
    );

    // Combinaison des résultats des trois filtres en éliminant les doublons
    filteredDataInput = [
      ...new Set([
        ...filteredByName,
        ...filteredByDescription,
        ...filteredByIngredients,
      ]),
    ];
  }

  return filteredDataInput;
}

export function messageErreur() {
  const containerRecetteAll = document.querySelector(".container-recette-all");
  containerRecetteAll.innerHTML = `<div class='message-erreur'>Aucune recette ne contient ‘${value}’ vous pouvez chercher «tarte aux pommes », « poisson », etc.</div>`;
  }


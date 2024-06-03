import { displayData } from "./js/display.js"; // Importation de la fonction displayData depuis le fichier display.js
import { fetchData } from "./js/api.js"; // Importation de la fonction fetchData depuis le fichier api.js
import {filtrageInput} from "./js/filtrage.js"; // Importation commentée de la fonction filtrageInput
const globalData = await fetchData(); // Appel asynchrone à fetchData pour récupérer les données et les stocker dans globalData

let filteredData = [];
let tagsIngredients = []; // Initialisation d'un tableau pour les tags des ingrédients
let tagsAppareils = []; // Initialisation d'un tableau pour les tags des appareils
let tagsUstensils = []; // Initialisation d'un tableau pour les tags des ustensiles

async function init() {
  
  displayData(globalData); 
  filtrageInput(globalData, filteredData => {
    if (filteredData.length  !== 0) {
      displayData(filteredData);  // Affiche les données filtrées si non vides
      console.log(filteredData);
    } else {
      displayData(globalData);  // Réaffiche globalData si aucun résultat filtré
    }
  });

}

init(); // Exécution de la fonction init au chargement du script







// EXEMPLE DE COMMENT METTRE LES ADD EVENT LISTENER DES FILTRE

// const input = document.querySelector(".input-search"); // Sélection de l'élément input pour la recherche

// // Ajout d'un écouteur d'événements sur l'élément input pour réagir à chaque saisie de l'utilisateur
// input.addEventListener("input", (e) => {
//   // La valeur de la fonction displayData change pour afficher les cartes filtrées
//   const dataFiltrees = filtrageInput(e.target.value);
//   displayData(dataFiltrees);
// });

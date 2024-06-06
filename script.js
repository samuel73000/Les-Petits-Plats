// Ce fichier script.js sert de point d'entrée pour l'initialisation et la gestion des interactions dans l'application.
// Il importe et utilise des fonctions depuis d'autres modules pour afficher et filtrer les données.

// Importation de la fonction displayData depuis le fichier display.js
import { displayData } from "./js/display.js"; 

// Importation de la fonction fetchData depuis le fichier api.js
import { fetchData } from "./js/api.js"; 

// Importation commentée de la fonction filtrageInput
import {filtrageInput} from "./js/filtrage.js"; 

// Appel asynchrone à fetchData pour récupérer les données et les stocker dans globalData
const globalData = await fetchData(); 

// Initialisation d'un tableau pour les tags des ingrédients
let tagsIngredients = []; 

// Initialisation d'un tableau pour les tags des appareils
let tagsAppareils = []; 

// Initialisation d'un tableau pour les tags des ustensiles
let tagsUstensils = []; 

// Définition de la fonction init qui initialise l'application
async function init() {
  // Affichage des données initiales récupérées
  displayData(globalData); 

  // Appel à filtrageInput pour filtrer les données en fonction des entrées utilisateur
  filtrageInput(globalData, filteredData => {
    // Vérification si des données filtrées existent
    if (filteredData.length  !== 0) {
      displayData(filteredData);  // Affiche les données filtrées si le tableau filteredData n'est pas vide
    } else {
      displayData(globalData);  // Réaffiche globalData si aucun résultat filtré
    }
  });
}

// Exécution de la fonction init au chargement du script
init(); 

// EXEMPLE DE COMMENT METTRE LES ADD EVENT LISTENER DES FILTRE

// Sélection de l'élément input pour la recherche
// const input = document.querySelector(".input-search"); 

// Ajout d'un écouteur d'événements sur l'élément input pour réagir à chaque saisie de l'utilisateur
// input.addEventListener("input", (e) => {
//   // Filtrage des données en fonction de la valeur saisie et mise à jour de l'affichage
//   const dataFiltrees = filtrageInput(e.target.value);
//   displayData(dataFiltrees);
// });

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
let filteredDataMainInput = filtrageInput(globalData);// on stock le return de la function filtrageInput




// Définition de la fonction init qui initialise l'application
function init() {
  // Affichage des données initiales recupérées
  displayData(globalData);
  SelectFilterTag(globalData);
 
  boutonInputHeader.addEventListener("click", () => {
    // Met à jour les données filtrées du main input en utilisant la fonction filtrageInput avec globalData
    filteredDataMainInput = filtrageInput(globalData);
     


     // Vérifie si aucune donnée n'a été filtrée
     if (filteredDataMainInput.length === 0) { 
      // Affiche les données initiales si aucune donnée n'a été filtrée
      displayData(globalData);
      SelectFilterTag(globalData);

    } else {
      // Affiche les données filtrées si des données ont été filtrées
      displayData(filteredDataMainInput);//  on mais a jour la data des cards de recette
      SelectFilterTag(filteredDataMainInput);// on mais a jour la data des tags 
    }
   
});


// filtre input des tags
const inputSubit = document.querySelectorAll(".loupe-for-input");
inputSubit[0].addEventListener("click", () => {
  let filteredDataInputTags = filtreTagIngredient(globalData);
    if (filteredDataMainInput.length === 0) {
        filtreTagIngredient(globalData);
        SelectFilterTag(filteredDataInputTags)
        console.log(filteredDataInputTags);
        console.log(filteredDataMainInput)
    } else {
        filtreTagIngredient(filteredDataMainInput);
        SelectFilterTag(filteredDataInputTags)
        console.log(filteredDataInputTags);
    }
});



}

init();

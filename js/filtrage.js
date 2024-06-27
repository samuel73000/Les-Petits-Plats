let value = ""; // Déclaration d'une variable pour stocker la valeur de l'input
let filteredDataInput = [];

export function filtrageInput(globalData) {
  // Sélection des éléments du DOM pour l'input et le bouton
  const inputMain = document.querySelector(".input-header");

  // Récupération de la valeur de l'input
  value = inputMain.value; // Déclaration d'un tableau pour stocker les données filtrées
  
  // Vérification que la valeur saisie contient au moins 3 caractères
  if (value.length >= 3) {
    // Déclaration d'un Set pour stocker les données filtrées sans doublons
    const filteredSet = new Set();

    // Boucle pour filtrer par nom, description, et ingrédients
    for (const item of globalData) {
      const lowerCaseValue = value.toLowerCase();

      // Vérification par nom
      if (item.name.toLowerCase().includes(lowerCaseValue)) {
        filteredSet.add(item);
      }

      // Vérification par description
      if (item.description.toLowerCase().includes(lowerCaseValue)) {
        filteredSet.add(item);
      }

      // Vérification par ingrédients
      for (const ingredient of item.ingredients) {
        if (ingredient.ingredient.toLowerCase().includes(lowerCaseValue)) {
          filteredSet.add(item);
          break; // Sortir de la boucle des ingrédients si un match est trouvé
        }
      }
    }

    // Conversion du Set en tableau
    filteredDataInput = Array.from(filteredSet);
  } else {
    filteredDataInput = []; // Réinitialiser si la valeur est inférieure à 3 caractères
  }

  return filteredDataInput;
}

export function messageErreur() {
  const containerRecetteAll = document.querySelector(".container-recette-all");
  containerRecetteAll.innerHTML = `<div class='message-erreur'>Aucune recette ne contient ‘${value}’ vous pouvez chercher «tarte aux pommes », « poisson », etc.</div>`;
  }


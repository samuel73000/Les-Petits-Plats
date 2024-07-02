// Déclaration d'une variable pour stocker la valeur de l'input de recherche
let value = "";

// Déclaration d'un tableau pour stocker les données filtrées basées sur la recherche
let filteredDataInput = [];

/**
 * Fonction pour filtrer les recettes en fonction de la valeur saisie dans l'input
 * @param {Array} globalData - Tableau contenant toutes les données des recettes disponibles
 * @returns {Array} filteredDataInput - Tableau des recettes filtrées en fonction de la recherche
 */
export function filtrageInput(globalData) {
  // Sélection de l'élément input du DOM où l'utilisateur tape sa recherche
  const inputMain = document.querySelector(".input-header");

  // Récupération de la valeur saisie dans l'input
  value = inputMain.value;

  // Vérification si la longueur de la valeur saisie est d'au moins 3 caractères
  // Si oui, filtrer les recettes ; sinon, réinitialiser le tableau filtré
  if (value.length >= 3) {
    // Création d'un Set pour stocker les données filtrées sans doublons
    const filteredSet = new Set();

    // Boucle pour parcourir toutes les recettes dans globalData
    for (const item of globalData) {
      // Convertir la valeur saisie en minuscules pour une comparaison insensible à la casse
      const lowerCaseValue = value.toLowerCase();

      // Vérification si le nom de la recette contient la valeur recherchée
      if (item.name.toLowerCase().includes(lowerCaseValue)) {
        filteredSet.add(item); // Ajout de la recette au Set si elle correspond
      }

      // Vérification si la description de la recette contient la valeur recherchée
      if (item.description.toLowerCase().includes(lowerCaseValue)) {
        filteredSet.add(item); // Ajout de la recette au Set si elle correspond
      }

      // Vérification si l'un des ingrédients de la recette contient la valeur recherchée
      for (const ingredient of item.ingredients) {
        if (ingredient.ingredient.toLowerCase().includes(lowerCaseValue)) {
          filteredSet.add(item); // Ajout de la recette au Set si l'ingrédient correspond
          break; // Sortir de la boucle des ingrédients après avoir trouvé un match
        }
      }
    }

    // Conversion du Set en tableau pour être utilisé dans le reste du code
    filteredDataInput = Array.from(filteredSet);
  } else {
    // Réinitialiser filteredDataInput à un tableau vide si la valeur saisie est inférieure à 3 caractères
    filteredDataInput = [];
  }

  // Retourner les données filtrées
  return filteredDataInput;
}

/**
 * Fonction pour afficher un message d'erreur lorsque aucune recette ne correspond à la recherche
 */
export function messageErreur() {
  // Sélection de l'élément du DOM où les recettes sont affichées
  const containerRecetteAll = document.querySelector(".container-recette-all");
  const nombreRecette = document.querySelector(".nombre-recette");

  // Mise à jour du contenu HTML du conteneur avec un message d'erreur basé sur la valeur recherchée
  nombreRecette.textContent = "0 recettes";
  containerRecetteAll.innerHTML = `<div class='message-erreur'>Aucune recette ne contient ‘${value}’ vous pouvez chercher «tarte aux pommes », « poisson », etc.</div>`;
}

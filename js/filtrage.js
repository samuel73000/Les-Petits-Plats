// Déclaration d'une variable pour stocker la valeur de l'input
let value = "";
// Déclaration d'un tableau pour stocker les données filtrées
let filteredDataInput = [];

// Fonction pour filtrer les données en fonction de la valeur de l'input
export function filtrageInput(globalData) {
  // Sélection de l'élément du DOM pour l'input principal
  const inputMain = document.querySelector(".input-header");

  // Récupération de la valeur de l'input
  value = inputMain.value;

  // Vérification que la valeur saisie contient au moins 3 caractères
  if (value.length >= 3) {
    // Filtrage des données par nom
    let filteredByName = globalData.filter(
      (item) => item.name.toLowerCase().includes(value.toLowerCase()) 
    );

    // Filtrage des données par description
    let filteredByDescription = globalData.filter(
      (item) => item.description.toLowerCase().includes(value.toLowerCase()) 
    );

    // Filtrage des données par ingrédients
    let filteredByIngredients = globalData.filter(
      (item) =>
        item.ingredients.some(
          (ingredient) =>
            ingredient.ingredient.toLowerCase().includes(value.toLowerCase()) 
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

  // Retourne les données filtrées
  return filteredDataInput;
}

// Fonction pour afficher un message d'erreur si aucune recette ne correspond à la recherche
export function messageErreur() {
  // Sélection de l'élément du DOM pour le conteneur des recettes
  const containerRecetteAll = document.querySelector(".container-recette-all");

  // Insertion du message d'erreur dans le conteneur des recettes
  containerRecetteAll.innerHTML = `<div class='message-erreur'>Aucune recette ne contient ‘${value}’ vous pouvez chercher «tarte aux pommes », « poisson », etc.</div>`;
}

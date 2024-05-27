let globalData = null;
async function fetchData() {
  try {
    // Effectue une requête fetch pour obtenir les données depuis le fichier 'recipes.js'
    const response = await fetch("./recipes.js");
    // Vérifie si la réponse n'est pas réussie (status HTTP non 200)
    if (!response.ok) {
      // Lance une exception avec le statut de la réponse HTTP si la requête a échoué
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Convertit la réponse en JSON
    globalData = await response.json();
  } catch (error) {
    // Attrape les erreurs survenues pendant la requête ou le traitement des données et les affiche dans la console
    console.log(error);
  }
}
function displayData() {
  // Sélectionne le conteneur principal pour toutes les recettes
  const containerRecetteAll = document.querySelector(".container-recette-all");
  
  // Appelle fetchData et attend sa résolution avant de continuer
  fetchData().then(() => {
    // Itère sur chaque élément de globalData (chaque recette)
    globalData.forEach((element) => {
      // Crée un nouvel élément 'article' pour chaque recette
      const NewArticleRecette = document.createElement("article");
      // Ajoute une classe pour le style
      NewArticleRecette.classList.add("container-recette");
      // Initialise une variable pour construire le HTML des ingrédients
      let ingredientsHTML = "";
      // Boucle sur chaque ingrédient de la recette
      for (let i = 0; i < element.ingredients.length; i++) {
        // Vérifie si l'ingrédient existe
        if (element.ingredients[i]) {
          // Construit le HTML pour chaque ingrédient en vérifiant si quantity et unit existent
          const quantity = element.ingredients[i].quantity || ''; // Utilise une chaîne vide si quantity est undefined
          const unit = element.ingredients[i].unit || ''; // Utilise une chaîne vide si unit est undefined
          ingredientsHTML += `
                <div>
                  <h3 class="titre-ingredients">${element.ingredients[i].ingredient}</h3>
                  <p class="ingredients">${quantity + " " + unit}</p>
                </div>
                `;
        }
      }
      // Définit le contenu HTML de l'article de la recette
      NewArticleRecette.innerHTML = `
        <img class="img-recette" src="./Photos recette/${element.image}" alt="${element.name}" >
        <div class="timer-recette">${element.time}min</div>
        <div class="description-recette">
        <h2 class="nom-de-recette">${element.name}</h2>
        <p class="titre-recette">Recette</p>
        <p class="instruction-recette">${element.description}</p>
        <p class="titre-recette">INGRÉDIENTS</p>
        </div>
        <div class="container-ingredients-recette">
            ${ingredientsHTML}
        </div>
        `;

      containerRecetteAll.appendChild(NewArticleRecette);
    });
  });
}
displayData();

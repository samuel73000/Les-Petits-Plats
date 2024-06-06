// function pour afficher les recettes dans le DOM
export function displayData(globalData) {
  // Sélectionne le conteneur principal pour toutes les recettes
  const containerRecetteAll = document.querySelector(".container-recette-all");
  //   selectionner le nombre de recette
  const nombreRecette = document.querySelector(".nombre-recette");

  // Efface le contenu précédent du conteneur
  containerRecetteAll.innerHTML = '';


  // Itère sur chaque élément de globalData (chaque recette)
  globalData.forEach((element) => {
    // on affiche combien de recette il y a sur la page
    nombreRecette.textContent = globalData.length + " recettes";
    // Crée un nouvel élément 'article' pour chaque recette
    const NewArticleRecette = document.createElement("article");
    // Ajoute une classe pour le style
    NewArticleRecette.classList.add("container-recette");
    // Ajoute un id
    NewArticleRecette.setAttribute("id", element.id);
    // Initialise une variable pour construire le HTML des ingrédients
    let ingredientsHTML = "";
    // Boucle sur chaque ingrédient de la recette
    for (let i = 0; i < element.ingredients.length; i++) {
      // Vérifie si l'ingrédient existe
      if (element.ingredients[i]) {
        // Construit le HTML pour chaque ingrédient en vérifiant si quantity et unit existent
        const quantity = element.ingredients[i].quantity || ""; // Utilise une chaîne vide si quantity est undefined
        const unit = element.ingredients[i].unit || ""; // Utilise une chaîne vide si unit est undefined
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

}

// on fait les select pour les filtres de tag 
export function SelectFilterTag(globalData){
  //on recupere tous les ingredients dans un set
  const ingredientsSet = new Set(); // Crée un Set pour stocker les ingrédients uniques
  globalData.forEach((element) => {
    element.ingredients.forEach((ingredient) => {
      const normalizedIngredient = ingredient.ingredient.trim().toLowerCase(); // Normalise l'ingrédient
      if (!ingredientsSet.has(normalizedIngredient)) {
        ingredientsSet.add(normalizedIngredient); // Ajoute l'ingrédient normalisé au Set s'il n'est pas déjà présent
      }
    });
  });
//on recupere tous les ustensiles dans un set
const ustensilesSet = new Set(); // Crée un Set pour stocker les ustensiles uniques
globalData.forEach((element) => {
  element.ustensils.forEach((ustensils) => {
    const normalizedUstensils = ustensils.trim().toLowerCase(); // Normalise l'ustensil
    if (!ustensilesSet.has(normalizedUstensils)) {
      ustensilesSet.add(normalizedUstensils); // Ajoute l'ustensil normalisé au Set s'il n'est pas déjà présent
    }
  });
});
//on recupere tous les appareils dans un set
const applianceSet = new Set(); // Crée un Set pour stocker les appareils uniques
globalData.forEach((element) => {
    const appliance = element.appliance;
    if (typeof appliance === 'string') { // Vérifie si appliance est une chaîne de caractères
        const normalizedAppliance = appliance.trim().toLowerCase(); // Normalise l'appareil
        if (!applianceSet.has(normalizedAppliance)) {
            applianceSet.add(normalizedAppliance); // Ajoute l'appareil normalisé au Set s'il n'est pas déjà présent
        }
    } 
});



  const containerFiltreTagAll = document.querySelectorAll(".container-filtre");
  const textes = ["Ingrédient", "Ustensile", "Appareil"]; // Textes différents pour chaque p
  containerFiltreTagAll.forEach((container, index) => {
    container.textContent = textes[index % textes.length]; // Utilise l'index pour choisir le texte
    const SelectFleche = document.createElement("i"); // on crée une icone pour les flèches 
    SelectFleche.classList.add("fa-solid", "fa-chevron-down" , "flecheSelect"); // on ajoute la classe pour le style
    container.appendChild(SelectFleche); // on ajoute la flèche dans le container

// creation de la modal ouverte
const divModalSelect = document.createElement("div"); // creation d'un div
divModalSelect.classList.add("div-modal-select"); // on ajoute la classe pour le style
container.appendChild(divModalSelect); // on ajoute le div dans le container

const inputSelect = document.createElement("input"); // creation d'un input
inputSelect.classList.add("input-select"); // on ajoute la classe pour le style
divModalSelect.appendChild(inputSelect); // on ajoute l'input dans le div 

const LoupeForInput = document.createElement("i"); // creation d'un icone loupe
LoupeForInput.classList.add("fa-solid", "fa-magnifying-glass" , "loupe-for-input"); // on ajoute la classe pour le style
divModalSelect.appendChild(LoupeForInput); // on ajoute le loupe dans l'input

//on verfie si c'est le premier élément et on crée la div pour les ingrediants
if (index === 0) { 
  const divModalSelectIgrediants = document.createElement("div"); // creation d'un div
  divModalSelectIgrediants.classList.add("div-modal-select-ingrediants"); // on ajoute la classe pour le style
  divModalSelect.appendChild(divModalSelectIgrediants); // on ajoute le div dans le divModalSelect

ingredientsSet.forEach(ingredient => {// Utilisation de forEach pour parcourir le Set et ajouter les ingrediants dans la div
  const pSelectTag = document.createElement("p"); // on cree un "p"
  pSelectTag.classList.add("p-select-tag"); // on ajoute la classe pour le style
  pSelectTag.textContent = ingredient; // on ajoute le texte dans le "p"
  divModalSelectIgrediants.appendChild(pSelectTag); // on ajoute le "p" dans le div
});
}
//on verfie si c'est le deuxieme élément et on crée la div pour les ustensiles
if (index === 1) { 
  const divModalSelectUstensiles = document.createElement("div"); // creation d'un div
  divModalSelectUstensiles.classList.add("div-modal-select-ustensiles"); // on ajoute la classe pour le style
  divModalSelect.appendChild(divModalSelectUstensiles); // on ajoute le div dans le divModalSelect

ustensilesSet.forEach(ustensils => {// Utilisation de forEach pour parcourir le Set et ajouter les ustensiles dans la div
  const pSelectTag = document.createElement("p"); // on cree un "p"
  pSelectTag.classList.add("p-select-tag"); // on ajoute la classe pour le style
  pSelectTag.textContent = ustensils; // on ajoute le texte dans le "p"
  divModalSelectUstensiles.appendChild(pSelectTag); // on ajoute le "p" dans le div
});
}
//on verfie si c'est le troisieme élément et on crée la div pour les apareils
if (index === 2) { 
  const divModalSelectAppliance = document.createElement("div"); // creation d'un div
  divModalSelectAppliance.classList.add("div-modal-select-appliance"); // on ajoute la classe pour le style
  divModalSelect.appendChild(divModalSelectAppliance); // on ajoute le div dans le divModalSelect

applianceSet.forEach(appliance => {// Utilisation de forEach pour parcourir le Set et ajouter les ustensiles dans la div
  const pSelectTag = document.createElement("p"); // on cree un "p"
  pSelectTag.classList.add("p-select-tag"); // on ajoute la classe pour le style
  pSelectTag.textContent = appliance; // on ajoute le texte dans le "p"
  divModalSelectAppliance.appendChild(pSelectTag); // on ajoute le "p" dans le div
});
}


    // Ajouter l'écouteur d'événements à chaque container individuellement
    SelectFleche.addEventListener("click", () => {
      SelectFleche.classList.toggle("fa-chevron-down");
      SelectFleche.classList.toggle("fa-chevron-up");
      divModalSelect.classList.toggle("invisible");
    });
  })


}

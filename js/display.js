// function pour afficher les recettes dans le DOM
export function displayData(globalData) {
  // Sélectionne le conteneur principal pour toutes les recettes
  const containerRecetteAll = document.querySelector(".container-recette-all");
  // Sélectionne l'élément qui affiche le nombre de recettes
  const nombreRecette = document.querySelector(".nombre-recette");

  // Efface le contenu précédent du conteneur
  containerRecetteAll.innerHTML = "";

  // Itère sur chaque élément de globalData (chaque recette)
  globalData.forEach((element) => {
    // Affiche le nombre total de recettes sur la page
    nombreRecette.textContent = globalData.length + " recettes";
    // Crée un nouvel élément 'article' pour chaque recette
    const NewArticleRecette = document.createElement("article");
    // Ajoute une classe pour le style
    NewArticleRecette.classList.add("container-recette");
    // Ajoute un id à l'article basé sur l'id de la recette
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

    // Ajoute l'article créé au conteneur principal
    containerRecetteAll.appendChild(NewArticleRecette);
  });
}

// Fonction pour initialiser les filtres de tags
export function SelectFilterTag(globalData) {
  // Crée un Set pour stocker les ingrédients uniques
  const ingredientsSet = new Set();
  // Itère sur chaque recette pour extraire les ingrédients
  globalData.forEach((element) => {
    element.ingredients.forEach((ingredient) => {
      const normalizedIngredient = ingredient.ingredient.trim().toLowerCase(); // Normalise l'ingrédient
      if (!ingredientsSet.has(normalizedIngredient)) {
        ingredientsSet.add(normalizedIngredient); // Ajoute l'ingrédient normalisé au Set s'il n'est pas déjà présent
      }
    });
  });
  // Crée un Set pour stocker les ustensiles uniques
  const ustensilesSet = new Set();
  // Itère sur chaque recette pour extraire les ustensiles
  globalData.forEach((element) => {
    element.ustensils.forEach((ustensils) => {
      const normalizedUstensils = ustensils.trim().toLowerCase(); // Normalise l'ustensil
      if (!ustensilesSet.has(normalizedUstensils)) {
        ustensilesSet.add(normalizedUstensils); // Ajoute l'ustensil normalisé au Set s'il n'est pas déjà présent
      }
    });
  });
  // Crée un Set pour stocker les appareils uniques
  const applianceSet = new Set();
  // Itère sur chaque recette pour extraire les appareils
  globalData.forEach((element) => {
    const appliance = element.appliance;
    if (typeof appliance === "string") {
      const normalizedAppliance = appliance.trim().toLowerCase(); // Normalise l'appareil
      if (!applianceSet.has(normalizedAppliance)) {
        applianceSet.add(normalizedAppliance); // Ajoute l'appareil normalisé au Set s'il n'est pas déjà présent
      }
    }
  });

  // Sélectionne tous les conteneurs de filtres
  const containerFiltreTagAll = document.querySelectorAll(".container-filtre");
  const textes = ["Ingrédient", "Ustensile", "Appareil"]; // Textes pour chaque type de filtre
  // Itère sur chaque conteneur de filtre
  containerFiltreTagAll.forEach((container, index) => {
    container.textContent = textes[index % textes.length]; // Définit le texte du filtre
    const SelectFleche = document.createElement("i"); // Crée une icône pour les flèches
    SelectFleche.classList.add("fa-solid", "fa-chevron-down", "flecheSelect"); // Ajoute des classes pour le style
    container.appendChild(SelectFleche); // Ajoute la flèche dans le conteneur

    // Crée un div pour la modal de sélection
    const divModalSelect = document.createElement("div");
    divModalSelect.classList.add("div-modal-select"); // Ajoute des classes pour le style
    container.appendChild(divModalSelect); // Ajoute le div dans le conteneur

    const inputSelect = document.createElement("input"); // Crée un input pour la recherche
    inputSelect.classList.add("input-select"); // Ajoute des classes pour le style
    divModalSelect.appendChild(inputSelect); // Ajoute l'input dans le div

    const LoupeForInput = document.createElement("i"); // Crée une icône de loupe
    LoupeForInput.classList.add(
      "fa-solid",
      "fa-magnifying-glass",
      "loupe-for-input"
    ); // Ajoute des classes pour le style
    divModalSelect.appendChild(LoupeForInput); // Ajoute la loupe dans le div

    // Crée des divs pour les ingrédients, ustensiles, et appareils en fonction de l'index
    if (index === 0) {
      const divModalSelectIgrediants = document.createElement("div"); // Crée un div pour les ingrédients
      divModalSelectIgrediants.classList.add("div-modal-select-ingrediants"); // Ajoute des classes pour le style
      divModalSelect.appendChild(divModalSelectIgrediants); // Ajoute le div dans le divModalSelect

      ingredientsSet.forEach((ingredient) => {
        // Utilisation de forEach pour parcourir le Set et ajouter les ingrédients dans la div
        const pSelectTag = document.createElement("p"); // Crée un élément "p"
        pSelectTag.classList.add("p-select-tag"); // Ajoute des classes pour le style
        pSelectTag.textContent = ingredient; // Définit le texte de l'élément "p"
        divModalSelectIgrediants.appendChild(pSelectTag); // Ajoute l'élément "p" dans le div
      });
    }
    // Vérifie si c'est le deuxième élément et crée la div pour les ustensiles
    if (index === 1) {
      const divModalSelectUstensiles = document.createElement("div"); // Crée un div pour les ustensiles
      divModalSelectUstensiles.classList.add("div-modal-select-ustensiles"); // Ajoute des classes pour le style
      divModalSelect.appendChild(divModalSelectUstensiles); // Ajoute le div dans le divModalSelect

      ustensilesSet.forEach((ustensils) => {
        // Utilisation de forEach pour parcourir le Set et ajouter les ustensiles dans la div
        const pSelectTag = document.createElement("p"); // Crée un élément "p"
        pSelectTag.classList.add("p-select-tag"); // Ajoute des classes pour le style
        pSelectTag.textContent = ustensils; // Définit le texte de l'élément "p"
        divModalSelectUstensiles.appendChild(pSelectTag); // Ajoute l'élément "p" dans le div
      });
    }
    // Vérifie si c'est le troisième élément et crée la div pour les appareils
    if (index === 2) {
      const divModalSelectAppliance = document.createElement("div"); // Crée un div pour les appareils
      divModalSelectAppliance.classList.add("div-modal-select-appliance"); // Ajoute des classes pour le style
      divModalSelect.appendChild(divModalSelectAppliance); // Ajoute le div dans le divModalSelect

      applianceSet.forEach((appliance) => {
        // Utilisation de forEach pour parcourir le Set et ajouter les appareils dans la div
        const pSelectTag = document.createElement("p"); // Crée un élément "p"
        pSelectTag.classList.add("p-select-tag"); // Ajoute des classes pour le style
        pSelectTag.textContent = appliance; // Définit le texte de l'élément "p"
        divModalSelectAppliance.appendChild(pSelectTag); // Ajoute l'élément "p" dans le div
      });
    }

    // Ajoute l'écouteur d'événements à chaque container individuellement
    SelectFleche.addEventListener("click", () => {
      SelectFleche.classList.toggle("fa-chevron-down");
      SelectFleche.classList.toggle("fa-chevron-up");
      divModalSelect.classList.toggle("visible");
    });
  });
}


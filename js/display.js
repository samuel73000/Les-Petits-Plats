// Fonction pour afficher les recettes dans le DOM
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
          <img class="img-recette" src="./photos_recette/${element.image}" alt="${element.name}">
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

    // Ajoute l'article de la recette au conteneur principal
    containerRecetteAll.appendChild(NewArticleRecette);
  });
}

// Fonction pour créer les éléments de filtre
function createFilterElements(globalData, elementFiltrer, index, type) {
  // Sélectionne tous les conteneurs de filtres
  const containerFiltreTagAll = document.querySelectorAll(".container-filtre");
  // Tableau des textes pour chaque type de filtre
  const textes = ["Ingrédients", "Ustensiles", "Appareils"];

  containerFiltreTagAll.forEach((container, idx) => {
    if (idx !== index) return;

    // Initialiser seulement une fois
    if (!container.classList.contains("initialized")) {
      container.classList.add("initialized");

      // Ajoute le texte approprié au conteneur
      container.textContent = textes[idx % textes.length];

      // Crée l'icône de la flèche pour le filtre
      const SelectFleche = document.createElement("i");
      SelectFleche.classList.add("fa-solid", "fa-chevron-down", "flecheSelect");
      container.appendChild(SelectFleche);

      // Crée un conteneur modal pour les options du filtre
      const divModalSelect = document.createElement("div");
      divModalSelect.classList.add("div-modal-select");
      container.appendChild(divModalSelect);

      // Crée un input pour rechercher dans les options du filtre
      const inputSelect = document.createElement("input");
      inputSelect.classList.add("input-select");
      divModalSelect.appendChild(inputSelect);

      // Crée une icône de loupe pour l'input
      const loupeForInput = document.createElement("i");
      loupeForInput.classList.add("fa-solid", "fa-magnifying-glass", "loupe-for-input");
      divModalSelect.appendChild(loupeForInput);

      // Ajoute un événement pour ouvrir/fermer le modal au clic sur la flèche
      SelectFleche.addEventListener("click", (event) => {
        event.stopPropagation();
        SelectFleche.classList.toggle("fa-chevron-down");
        SelectFleche.classList.toggle("fa-chevron-up");
        divModalSelect.classList.toggle("visible");
      });
    }

    const divModalSelect = container.querySelector(".div-modal-select");
    let divModalSelectElement = divModalSelect.querySelector(`.div-modal-select-${type}`);
    
    // Si l'élément n'existe pas, le créer
    if (!divModalSelectElement) {
      divModalSelectElement = document.createElement("div");
      divModalSelectElement.classList.add(`div-modal-select-${type}`);
      divModalSelect.appendChild(divModalSelectElement);
    } else {
      // Sinon, vider son contenu pour le mettre à jour
      divModalSelectElement.innerHTML = "";
    }

    // Utilise un Set pour éviter les doublons
    let elementSet = new Set();
    globalData.forEach((element) => {
      let elementsArray = [];
      if (type === "ingredient") {
        elementsArray = element.ingredients.map((ing) => ing.ingredient.trim().toLowerCase());
      } else if (type === "ustensil") {
        elementsArray = element.ustensils.map((ust) => ust.trim().toLowerCase());
      } else if (type === "appliance") {
        elementsArray = [element.appliance.trim().toLowerCase()];
      }
      elementsArray.forEach((item) => {
        if (!elementSet.has(item)) {
          elementSet.add(item);
        }
      });
    });

    // Détermine les éléments à utiliser pour le filtre
    const elementsToUse = elementFiltrer && elementFiltrer.length > 0 ? elementFiltrer : Array.from(elementSet);
    elementsToUse.forEach((item) => {
      const pSelectTag = document.createElement("p");
      pSelectTag.classList.add("p-select-tag");
      pSelectTag.textContent = item;
      divModalSelectElement.appendChild(pSelectTag);
    });
  });
}

// Fonction de filtrage par ingrédients
export function SelectFilterTagIngredients(globalData, elementFiltrer) {
  createFilterElements(globalData, elementFiltrer, 0, "ingredient");
}

// Fonction de filtrage par ustensiles
export function SelectFilterTagUstensiles(globalData, elementFiltrer) {
  createFilterElements(globalData, elementFiltrer, 1, "ustensil");
}

// Fonction de filtrage par appareils
export function SelectFilterTagAppliance(globalData, elementFiltrer) {
  createFilterElements(globalData, elementFiltrer, 2, "appliance");
}

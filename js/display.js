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


// Cette fonction createFilterElements prend en paramètres globalData (les données globales des recettes), elementFiltrer (les éléments à filtrer), index (l'index du type de filtre), et type (le type de filtre : "ingredient", "ustensil", ou "appliance").
function createFilterElements(globalData, elementFiltrer, index, type) {
  const containerFiltreTagAll = document.querySelectorAll(".container-filtre");
  const textes = ["Ingrédient", "Ustensile", "Appareil"]; // Tableau des textes pour chaque type de filtre

  // Itère sur chaque conteneur de filtre
  containerFiltreTagAll.forEach((container, idx) => {
    // Vérifie si l'index correspond à l'index du type de filtre
    if (idx !== index) return;

    // Définit le texte du filtre en fonction du type
    container.textContent = textes[idx % textes.length];

    // Crée une icône de flèche pour le filtre
    const SelectFleche = document.createElement("i");
    SelectFleche.classList.add("fa-solid", "fa-chevron-down", "flecheSelect");
    container.appendChild(SelectFleche);

    // Crée un div pour le sélecteur
    const divModalSelect = document.createElement("div");
    divModalSelect.classList.add("div-modal-select");
    container.appendChild(divModalSelect);

    // Crée un input pour la recherche
    const inputSelect = document.createElement("input");
    inputSelect.classList.add("input-select");
    divModalSelect.appendChild(inputSelect);

    // Crée une icône loupe pour la recherche
    const LoupeForInput = document.createElement("i");
    LoupeForInput.classList.add("fa-solid", "fa-magnifying-glass", "loupe-for-input");
    divModalSelect.appendChild(LoupeForInput);

    // Crée un Set pour stocker les éléments uniques
    let elementSet = new Set();

    // Itère sur chaque recette pour extraire les éléments selon le type
    globalData.forEach((element) => {
      let elementsArray = [];
      if (type === "ingredient") {
        elementsArray = element.ingredients.map(ing => ing.ingredient.trim().toLowerCase());
      } else if (type === "ustensil") {
        elementsArray = element.ustensils.map(ust => ust.trim().toLowerCase());
      } else if (type === "appliance") {
        elementsArray = [element.appliance.trim().toLowerCase()];
      }
      // Ajoute les éléments uniques à l'ensemble
      elementsArray.forEach((item) => {
        if (!elementSet.has(item)) {
          elementSet.add(item);
        }
      });
    });

    // Crée un div pour afficher les éléments filtrés
    const divModalSelectElement = document.createElement("div");
    divModalSelectElement.classList.add(`div-modal-select-${type}`);
    divModalSelect.appendChild(divModalSelectElement);

    // Détermine les éléments à utiliser pour le filtre
    const elementsToUse = elementFiltrer && elementFiltrer.length > 0 ? elementFiltrer : Array.from(elementSet);

    // Affiche chaque élément dans le div de sélection
    elementsToUse.forEach((item) => {
      const pSelectTag = document.createElement("p");
      pSelectTag.classList.add("p-select-tag");
      pSelectTag.textContent = item;
      divModalSelectElement.appendChild(pSelectTag);
    });

    // Ajoute un événement de clic pour afficher ou masquer les éléments filtrés
    SelectFleche.addEventListener("click", () => {
      SelectFleche.classList.toggle("fa-chevron-down");
      SelectFleche.classList.toggle("fa-chevron-up");
      divModalSelect.classList.toggle("visible");
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

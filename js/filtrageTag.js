export async function filtrageTagsInput(globalData) {
const inputSelect = document.querySelectorAll(".input-select");
const inputSubit = document.querySelectorAll(".loupe-for-input");


// on recuper les donner et on les stock dans des set 


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

// on fait les filtres

// const ingredientsArray = Array.from(ingredientsSet);
// let IngredientsFiltrer = [];
// // Ajoute un écouteur d'événements pour le clic sur le bouton de soumission
// inputSubit[0].addEventListener("click", () => {
//    IngredientsFiltrer.length = 0; // Vide le tableau avant d'ajouter de nouveaux éléments
//     // Filtre les ingrédients en fonction de la valeur saisie dans inputSelect
//     let filteredByIngredients = ingredientsArray.filter((item) =>
//         item.toLowerCase().includes(inputSelect[0].value.toLowerCase())
//     );
//     // Ajoute les éléments filtrés au tableau IngredientsFiltrer
//     IngredientsFiltrer.push(...filteredByIngredients);
// });



const ustensilesArray = Array.from(ustensilesSet);
let ustensilesFiltrer = [];
// Ajoute un écouteur d'événements pour le clic sur le bouton de soumission
inputSubit[1].addEventListener("click", () => {
    ustensilesFiltrer.length = 0; // Vide le tableau avant d'ajouter de nouveaux éléments
    let filteredByUstensiles = ustensilesArray.filter((item) =>
        item.toLowerCase().includes(inputSelect[1].value.toLowerCase())
    );
    ustensilesFiltrer.push(...filteredByUstensiles);

});


const applianceArray = Array.from(applianceSet);
let applianceFiltrer = [];
// Ajoute un écouteur d'événements pour le clic sur le bouton de soumission
inputSubit[2].addEventListener("click", () => {
    applianceFiltrer.length = 0; // Vide le tableau avant d'ajouter de nouveaux éléments
    let filteredByAppliance = applianceArray.filter((item) =>
        item.toLowerCase().includes(inputSelect[2].value.toLowerCase())
    );
    applianceFiltrer.push(...filteredByAppliance);
});
//  let filteredTagData = [IngredientsFiltrer, ustensilesFiltrer, applianceFiltrer];
// return filteredTagData
}



 export function filtreTagIngredient(globalData){
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
const inputSelect = document.querySelectorAll(".input-select");
    const ingredientsArray = Array.from(ingredientsSet);
    let IngredientsFiltrer = [];
    
       IngredientsFiltrer.length = 0; // Vide le tableau avant d'ajouter de nouveaux éléments
        // Filtre les ingrédients en fonction de la valeur saisie dans inputSelect
        let filteredByIngredients = ingredientsArray.filter((item) =>
            item.toLowerCase().includes(inputSelect[0].value.toLowerCase())
        );
        // Ajoute les éléments filtrés au tableau IngredientsFiltrer
        IngredientsFiltrer.push(...filteredByIngredients);
        return(IngredientsFiltrer)
}


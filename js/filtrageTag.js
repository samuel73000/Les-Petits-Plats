// Ce fichier contient des fonctions pour filtrer les données en fonction des tags à l'aide des inputs dans les select

// Fonction de filtrage par ingrédients
export function filtreTagIngredient(data) {
    const inputSelect = document.querySelectorAll(".input-select");
    const inputValues = Array.from(inputSelect).map(input => input.value.toLowerCase().trim()).filter(value => value !== "");
    let filteredIngredients = [];
    data.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            inputValues.forEach(inputValue => {
                if (ingredient.ingredient.toLowerCase().includes(inputValue) && !filteredIngredients.includes(ingredient.ingredient) && !filteredIngredients.includes(ingredient.ingredient.toLowerCase())) {
                    filteredIngredients.push(ingredient.ingredient);
                }
            });
        });
    });
    return filteredIngredients;
}

// Fonction de filtrage par ustensiles
export function filtreTagUstensiles(data) {
    const inputSelect = document.querySelectorAll(".input-select");
    const inputValues = Array.from(inputSelect).map(input => input.value.toLowerCase().trim()).filter(value => value !== "");
    let filteredUstensils = [];
    data.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            inputValues.forEach(inputValue => {
                if (ustensil.toLowerCase().includes(inputValue) && !filteredUstensils.includes(ustensil)) {
                    filteredUstensils.push(ustensil);
                }
            });
        });
    });
    return filteredUstensils;
}

// Fonction de filtrage par appareil
export function filtreTagAppliance(data) {
    const inputSelect = document.querySelectorAll(".input-select");
    const inputValues = Array.from(inputSelect).map(input => input.value.toLowerCase().trim()).filter(value => value !== "");
    let filteredAppliances = [];
    data.forEach(recipe => {
        inputValues.forEach(inputValue => {
            if (recipe.appliance.toLowerCase().includes(inputValue) && !filteredAppliances.includes(recipe.appliance)) {
                filteredAppliances.push(recipe.appliance);
            }
        });
    });
    return filteredAppliances;
}
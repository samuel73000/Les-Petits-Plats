// Ce fichier contient des fonctions pour filtrer les données en fonction des tags à l'aide des inputs dans les select

// Fonction de filtrage par ingrédients
export function filtreTagIngredient(data) {
    const inputSelect = document.querySelectorAll(".input-select");
    let filteredByIngredients = data.filter((recipe) =>
        recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(inputSelect[0].value.toLowerCase())
        )
    );
    return filteredByIngredients;
}

// Fonction de filtrage par ustensiles
export function filtreTagUstensiles(data) {
    const inputSelect = document.querySelectorAll(".input-select");
    let filteredByUstensiles = data.filter((recipe) =>
        recipe.ustensils.some((ustensil) =>
            ustensil.toLowerCase().includes(inputSelect[1].value.toLowerCase())
        )
    );
    return filteredByUstensiles;
}

// Fonction de filtrage par appareil
export function filtreTagAppliance(data) {
    const inputSelect = document.querySelectorAll(".input-select");
    let filteredByAppliance = data.filter((recipe) =>
        recipe.appliance.toLowerCase().includes(inputSelect[2].value.toLowerCase())
    );
    return filteredByAppliance;
}
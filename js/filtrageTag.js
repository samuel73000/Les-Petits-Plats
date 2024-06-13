// Ce fichier contient des fonctions pour filtrer les données en fonction des tags à l'aide des inputs dans les select

// Fonction de filtrage par ingrédients
// export function filtreTagIngredient(data) {
//     const inputSelect = document.querySelectorAll(".input-select");
//     let filteredByIngredients = data.filter((recipe) =>
//         recipe.ingredients.some((ingredient) =>
//             ingredient.ingredient.toLowerCase().includes(inputSelect[0].value.toLowerCase())
//         )
//     );
//     return filteredByIngredients;
// }
export function filtreTagIngredient(data) {
    const inputSelect = document.querySelectorAll(".input-select");
    const inputValues = Array.from(inputSelect).map(input => input.value.toLowerCase().trim()).filter(value => value !== "");
    let filteredIngredients = [];
    data.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            inputValues.forEach(inputValue => {
                if (ingredient.ingredient.toLowerCase().includes(inputValue) && !filteredIngredients.includes(ingredient.ingredient)) {
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
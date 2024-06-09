export function filtrageTagsInput(tagData) {
const inputSelect = document.querySelectorAll(".input-select");
const inputSubit = document.querySelectorAll(".loupe-for-input");

// Initialisation d'un tableau pour les tags des ingrédients
let ingredients = Array.from(tagData[0]);
let IngredientsFiltrer = [];

inputSubit[0].addEventListener("click", () => {
    let filteredByIngredients = ingredients.filter((item) =>
        item.toLowerCase().includes(inputSelect[0].value.toLowerCase())
    );
    IngredientsFiltrer.push(...filteredByIngredients);
});
   console.log(IngredientsFiltrer)


// Initialisation d'un tableau pour les tags des ustensiles
let ustensiles = Array.from(tagData[1]);
let ustensilesFiltrer = [];

   inputSubit[1].addEventListener("click",() =>{
 let filteredbyUstensiles = ustensiles.filter((item) =>
    item.toLowerCase().includes(inputSelect[1].value.toLowerCase())
);
ustensilesFiltrer.push(...filteredbyUstensiles);
   });
console.log(ustensilesFiltrer)


// Initialisation d'un tableau pour les tags des appliance
let appliance = Array.from(tagData[2]);
let applianceFiltrer = [];

inputSubit[2].addEventListener("click", ()=>{
    let filteredbyAppliance = appliance.filter((item) =>
    item.toLowerCase().includes(inputSelect[2].value.toLowerCase())
    );
    applianceFiltrer.push(...filteredbyAppliance);
})
console.log(applianceFiltrer)



}

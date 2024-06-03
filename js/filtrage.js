export function filtrageInput(globalData, callback) {
  const inputMain = document.querySelector(".input-header");
  const boutonInputHeader = document.querySelector(".bouton-input-header");

  boutonInputHeader.addEventListener("click", () => {
    const value = inputMain.value;
    let filteredData = []; // Utilisez let pour déclarer filteredData localement
    if (value.length >= 3) {
      filteredData = globalData.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      filteredData = globalData.filter((item) =>
      item.description.toLowerCase().includes(value.toLowerCase())
      );
    //   filteredData = globalData.filter((item) =>
    //   item.ingredients.ingredient.toLowerCase().includes(value.toLowerCase())
    //   );
    }
    console.log(filteredData);
    callback(filteredData); // Appel du callback avec les données filtrées
  });
}

// il que on fasse un .filtre sur la value de l'input puis que on recheche dans les card si on a une
// correspondance avec les titre , ingédiants ou les discription . si on a un correspondance on push dans le tableau filteredData
// on vas pouvoir faire un displayData(filteredData) pour affichier le nouveau .json.
//  (les filtre doivent commencer a partir de 3 carracteres )

// export function filtrageIngredient() {}
// export function filtrageIngredient() {}
// export function filtrageIngredient() {}
// export function filtrageTags() {}

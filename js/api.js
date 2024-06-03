// fonction pour recuperer les données
export async function fetchData() {
  try {
    // Effectue une requête fetch pour obtenir les données depuis le fichier 'recipes.js'
    const response = await fetch("./recipes.js");
    // Vérifie si la réponse n'est pas réussie (status HTTP non 200)
    if (!response.ok) {
      // Lance une exception avec le statut de la réponse HTTP si la requête a échoué
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // // Convertit la réponse en JSON
    return response.json();
    // globalData = await response.json();
  } catch (error) {
    // Attrape les erreurs survenues pendant la requête ou le traitement des données et les affiche dans la console
    console.log(error);
  }
}

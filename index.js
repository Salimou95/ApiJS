const fs = require("fs"); // Importer le module File System (Node.js)

const BASE_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=48.8534&longitude=2.3488&current=temperature_2m&hourly=temperature_2m,wind_speed_10m";

/**
 * Récupère les données météo depuis l'API, filtre les informations inutiles, et les sauvegarde.
 */
async function fetchWeatherData() {
  try {
    const response = await fetch(BASE_URL); // Effectuer une requête GET vers l'API
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const rawData = await response.json(); // Convertir la réponse brute en JSON

    console.log("Données météo brutes récupérées :", rawData);

    // Filtrer les données pour ne garder que ce qui est nécessaire
    const filteredData = filterWeatherData(rawData);

    // Sauvegarder les données filtrées dans un fichier JSON
    saveDataToFile("filtered_weather_data.json", filteredData);

    return filteredData; // Retourner les données filtrées pour un usage ultérieur
  } catch (error) {
    console.error("Erreur lors de la récupération des données météo :", error);
  }
}

/**
 * Filtre les données météo pour exclure les informations inutiles.
 * @param {Object} data - Les données brutes récupérées depuis l'API.
 * @returns {Object} - Les données filtrées.
 */
function filterWeatherData(data) {
  const { latitude, longitude, hourly } = data; // Récupérer uniquement les propriétés utiles
  return {
    latitude, // Inclure la météo actuelle
    longitude,
    hourly, // Inclure les données horaires
  };
}

/**
 * Sauvegarde des données dans un fichier JSON.
 * @param {string} fileName - Nom du fichier à créer.
 * @param {Object} data - Données JSON à sauvegarder.
 */
function saveDataToFile(fileName, data) {
  fs.writeFile(fileName, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(`Erreur lors de la sauvegarde de ${fileName} :`, err);
    } else {
      console.log(`Les données ont été sauvegardées dans '${fileName}'`);
    }
  });
}

// Appeler la fonction principale
fetchWeatherData();

import axios from "axios";

// Charger l'URL de base depuis les variables d'environnement
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Timeout de 5 secondes
  withCredentials: true,            // Permet d'envoyer des cookies
  headers: {
    "Content-Type": "application/json",
  }
});



export default api;
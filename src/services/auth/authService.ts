import api from "../api";


// Appel pour se connecter
export const login = async (username: string, password: string) => {
  try {
    const response = await api.post("/api/v1/users/login", 
      new URLSearchParams({ username, password }), // Encodage des données
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Type MIME attendu
        },
      });
      console.log("Réponse de l'API :", response.data);
      const accessToken = response.data.access_token;
    
      // Stocker le token en mémoire
      api.defaults.headers.Authorization = `Bearer ${accessToken}`;
      return response.data;
  } catch(error: any) {
    console.error("Erreur lors de la connexion :", error.response?.data);
    throw error;
  }
  
};

// Service d'inscription
export const signup = async (username: string, email: string, password: string, confirmPassword: string) => {
  const response = await api.post("/api/v1/users/signup", {
    username,
    email,
    password,
    confirm_password: confirmPassword,
  });
  const accessToken = response.data.access_token;
  // Stocker le token en mémoire
  api.defaults.headers.Authorization = `Bearer ${accessToken}`;
  return response.data;
};

// Appel pour se déconnecter
export const logout = async () => {
  await api.post("/api/v1/users/logout");
  // Nettoyer le token d'accès en mémoire
  delete api.defaults.headers.Authorization;
};

// Rafraîchir le token (déjà géré par l'interceptor)
export const refreshToken = async () => {
  const response = await api.post("/api/v1/users/refresh");
  const newAccessToken = response.data.access_token;

  // Met à jour le token en mémoire
  api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
  return response.data;
};

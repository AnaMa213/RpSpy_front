import api from "@/services/api";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "./useAuth";


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation(); // Récupère la route actuelle

    const checkAuth = async () => {
        setLoading(true);
        try {
            // Appel initial à /me
            const response = await api.get("/api/v1/users/me");
            setUser(response.data);
            console.log("Utilisateur authentifié :", response.data);
            return response.data; // Utilisateur authentifié
        } catch (error: any) {
            console.error("Échec de l'authentification :", error.response?.data);
            if (error.response?.status === 401) {
            try {
                console.log("Échec de l'authentification. Test Refresh_token");
                // Si /me échoue, tente de rafraîchir le token
                await api.post("/api/v1/users/refresh");
                const retryResponse = await api.get("/api/v1/users/me");
                setUser(retryResponse.data);
                return retryResponse.data; // Authentification réussie après rafraîchissement
            } catch (refreshError) {
                console.error("Échec du rafraîchissement du token :", refreshError);
                throw refreshError;
            }
            } else {
            throw error; // Autre erreur
            }
        }
        finally {
            setLoading(false);
        }
        };

    const logout = () => {
        setUser(null);
        api.post("/api/v1/users/logout").catch(console.error);
    };

    useEffect(() => {
        // Appelle uniquement sur les routes nécessitant une authentification
    if (!["/login", "/signup"].includes(location.pathname)) {
        checkAuth();
      } else {
        setLoading(false); // Pas besoin de vérifier l'authentification sur ces pages
      }
    }, [location.pathname]);

    return (
        <AuthContext.Provider
        value={{
            user,
            loading,
            isAuthenticated: !!user,
            checkAuth,
            logout,
        }}
        >
        {children}
        </AuthContext.Provider>
    );
    };
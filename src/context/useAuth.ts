import { createContext, useContext } from 'react';

type AuthContextType = {
    user: any;
    loading: boolean;
    isAuthenticated: boolean;
    checkAuth: () => Promise<void>;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth doit être utilisé dans AuthProvider");
    }
    return context;
};
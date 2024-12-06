
import { useAuth } from "@/context/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Chargement...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
    };

export default PrivateRoutes;

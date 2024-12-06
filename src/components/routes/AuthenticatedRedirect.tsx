import { useAuth } from "@/context/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedRedirect = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  }

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default AuthenticatedRedirect;

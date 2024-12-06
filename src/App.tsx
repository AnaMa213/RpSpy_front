import { Route, Routes } from "react-router-dom";
import AuthenticatedRedirect from "./components/routes/AuthenticatedRedirect";
import PrivateRoutes from "./components/routes/PrivateRoute";
import { LoginPage, SignupPage } from "./pages/AuthPages";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";


const App = () => {
  return (
      <Routes>
         {/* Routes publiques */}
      <Route element={<AuthenticatedRedirect />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      {/* Routes privées */}
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Ajoute d'autres routes protégées ici */}
      </Route>
        {/* Autres routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
};

export default App;

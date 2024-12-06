import { Link } from "react-router-dom";

const NotFound = () => {
return (
    <div className="text-center">
        <h1>404 - Page non trouvée</h1>
        <Link to="/" className="text-blue-500">
            Retour à l'accueil
        </Link>
    </div>
);
};

export default NotFound;

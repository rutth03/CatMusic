import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

export default function ProtectedRoute({ children }) {
    /* Envuelve un componente protegiendo las rutas privada. 
       Deniega su acceso en caso de que el usuario no este autenticado y lo redirecciona a Login. */
       
    const { isAuthenticated } = useAuth("state");
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
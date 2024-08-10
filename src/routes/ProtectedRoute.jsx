import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

export default function ProtectedRoute({ children }) {
    const { state: { isAuthenticated } } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
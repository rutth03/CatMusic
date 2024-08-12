/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, useContext } from "react";
import PropTypes from "prop-types";

/* Este archivo implementa un contexto de autenticación utilizando React Context y useReducer, permite manejar el estado de
   autenticación en toda la aplicación. 
   Proporciona un proveedor de contexto (`AuthProvider`) que envuelve la aplicación y ofrece acceso al estado de autenticación
   y acciones relacionadas a través del hook personalizado `useAuth`. */


// Se crea el contexto de autenticación, estableciendo un estado y acciones iniciales vacíos.
const AuthContext = createContext({
    state: {},
    actions: {},
});

// Se definen las acciones que pueden modificar el estado de autenticación.
const ACTIONS = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
};

// Reducer que maneja las acciones de login y logout, actualizando el estado de autenticación.
function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return {
                ...state,
                user__id: action.payload.user__id,
                token: action.payload.token,
                isAuthenticated: true,
            };
        case ACTIONS.LOGOUT:
            return {
                isAuthenticated: false,
            };
        default:
            return state;
    }
}

/* Componente proveedor que envuelve la aplicación, inicializa el estado de autenticación y define las acciones de login y
   logout. Estas acciones también interactúan con localStorage para persistir el estado de autenticación. */
function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        user__id: localStorage.getItem("user__id"),
        token: localStorage.getItem("authToken"),
        isAuthenticated: !!localStorage.getItem("authToken"),
    });

    const actions = {
        login: (token, user__id, navigate, location) => {
            dispatch({
                type: ACTIONS.LOGIN,
                payload: { token, user__id },
            });
            localStorage.setItem("authToken", token);
            localStorage.setItem("user__id", user__id);
            const origin = location.state?.from?.pathname || "/";
            navigate(origin);
        },
        logout: (navigate) => {
            dispatch({ type: ACTIONS.LOGOUT });
            localStorage.removeItem("authToken");
            localStorage.removeItem("user__id");
            navigate("/login");
        },
    };

    return (
        <AuthContext.Provider value={{ state, actions }}>
            {children}
        </AuthContext.Provider>
    );
}
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

/* Hook personalizado para acceder al contexto de autenticación. Permite acceder tanto al estado (`state`) como a las 
   acciones (`actions`) desde cualquier componente. */
function useAuth(type) {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context[type];
}

export { AuthContext, AuthProvider, useAuth };
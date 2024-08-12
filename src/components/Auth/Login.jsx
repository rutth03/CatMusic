import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import catDraw from "../../assets/Cat-Login.svg";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
    /* Renderiza el formulario de inicio de sesión y maneja la autenticación del usuario.
       Al enviar el formulario, se realiza una solicitud POST para autenticar al usuario con su nombre de usuario y contraseña.
       Si la autenticación es exitosa, se almacena el token y se redirige al usuario a la ruta home (/). */

    const usernameRef = useRef("");
    const passwordRef = useRef("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth("actions");
    const navigate = useNavigate();
    const location = useLocation();

    function handleSubmit(event) {
        event.preventDefault();
        if (!isLoading) {
            setIsLoading(true);
            fetch(`${import.meta.env.VITE_API_BASE_URL}api-auth/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: usernameRef.current.value,
                    password: passwordRef.current.value,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("No se pudo iniciar sesión");
                    }
                    return response.json();
                })
                .then((responseData) => {
                    login(responseData.token, responseData.user__id, navigate, location);
                })
                .catch((error) => {
                    console.error("Error al iniciar sesión", error);
                    setIsError(true);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }

    return ( 
       <div className="section" style={{ minHeight: '100vh', padding: 0, backgroundColor:'#E5BEFF' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <form className="box" onSubmit={handleSubmit} style={{width: '450px', margin: '0 auto'}}>
                            <div className="field">
                                <label htmlFor="username">Usuario:</label>
                                <div className="control has-icons-left">
                                    <input
                                        className="input"
                                        type="text"
                                        id="username"
                                        name="username"
                                        ref={usernameRef}
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="password">Contraseña:</label>
                                <div className="control has-icons-left">
                                    <input
                                        className="input"
                                        type="password"
                                        id="password"
                                        name="password"
                                        ref={passwordRef}
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-lock"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button
                                        type="submit"
                                        className="button is-primary is-fullwidth"
                                    >
                                        Iniciar sesión
                                    </button>
                                    {isLoading && <p>Cargando...</p>}
                                    {isError && <p>Error al cargar los datos.</p>}
                                </div>
                            </div>
                        </form>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor:'#E5BEFF' }}>
                            <figure className="image" style={{ margin: '0 auto' }}>
                                <img 
                                    src={catDraw}
                                    alt="Cat img"
                                    style={{ display: 'block', transform: 'scale(1.5)', objectFit: 'contain' }}
                                />
                        </figure>
                    </div>
            </div>
        </div>
    );
}

export default Login;

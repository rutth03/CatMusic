import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import catDraw from "../../assets/Cat-Login.svg";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [triggerFetch, setTriggerFetch] = useState(false);

    const [{ data, isError, isLoading }, doFetch] = useFetch(
        "https://sandbox.academiadevelopers.com/api-auth/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }
    );

    const { login } = useAuth();
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        setTriggerFetch(true);
        doFetch();
    }

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "username") setUsername(value);
        if (name === "password") setPassword(value);
    }

    useEffect(() => {
        if (data && !isError && triggerFetch) {
            login(data.token);
            navigate("/");
        }
    }, [data, isError, triggerFetch, login, navigate]);

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
                                        value={username}
                                        onChange={handleChange}
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
                                        value={password}
                                        onChange={handleChange}
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
                                    {isLoading && triggerFetch && (
                                        <p>Cargando...</p>
                                    )}
                                    {isError && <p>Error al cargar los datos.</p>}
                                    {data && (
                                        <p>{`Token obtenido: ${data.token}`}</p>
                                    )}
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

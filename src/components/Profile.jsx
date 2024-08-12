import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import iconDefault from "../assets/Avatar.svg";

function Profile() {
    /* Componente que devuelve la información del usuario logueado. Utiliza el token de autenticación obtenido a través 
       del contexto AuthContext para hacer una solicitud GET a la API y obtener los datos del perfil del usuario. */
       
    const { token } = useAuth("state");

    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}users/profiles/profile_data/`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Error al cargar el perfil");
                }

                const data = await response.json();
                setUserData(data);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProfile();
    }, [token]);

    if (isLoading) return <p>Cargando perfil...</p>;
    if (isError) return <p>Error al cargar el perfil.</p>;

    return (
        <div className="card">
            {userData ? (
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-48x48">
                                <img
                                    src={
                                        userData.image
                                            ? `${import.meta.env.VITE_API_BASE_URL}${userData.image}`
                                            : iconDefault
                                    }
                                    alt="Profile image"
                                    style={{ borderRadius: "50%" }}
                                />
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-4">
                                {userData.first_name} {userData.last_name}
                            </p>
                            <div
                                className="subtitle is-6"
                                style={{ display: "flex", alignItems: "center" }}
                            >
                                {userData.state && userData.state.icon ? (
                                    <>
                                        <img
                                            src={`${import.meta.env.VITE_API_BASE_URL}${userData.state.icon}`}
                                            alt="State icon"
                                            style={{
                                                height: "20px",
                                                marginRight: "5px",
                                                borderRadius: "50%",
                                            }}
                                        />
                                        {userData.state.name}
                                    </>
                                ) : (
                                    <span>Estado no disponible</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="content">
                        <p>Email: {userData.email}</p>
                        <p>Fecha de Nacimiento: {userData.dob || "No disponible"}</p>
                        <p>Biografía: {userData.bio || "No disponible"}</p>
                    </div>
                </div>
            ) : (
                <p className="subtitle">No se encontraron datos del usuario.</p>
            )}
        </div>
    );
}

export default Profile;
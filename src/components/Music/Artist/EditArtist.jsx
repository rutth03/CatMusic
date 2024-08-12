import { useAuth } from "../../../context/AuthContext";
import { useState, useEffect } from "react";
import SuccessAlert from "../../Alerts/SuccessAlert";
import PropTypes from "prop-types";

function EditArtist({ id, onClose }) {
    /* Componente modal que recibe un id de artista y renderiza un formulario con la información del artista obtenido.
       Realiza la petición para editar el artista. */

    const { token } = useAuth("state");
    const [nameData, setNameData] = useState("");
    const [bioData, setBioData] = useState("");
    const [websiteData, setWebsiteData] = useState("");
    const [imageData, setImageData] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchArtistData = async () => {
            if (!id) return;

            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/${id}/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                if (response.ok) {
                    const artistData = await response.json();
                    setNameData(artistData.name || "");
                    setBioData(artistData.bio || "");
                    setWebsiteData(artistData.website || "");
                } else {
                    throw new Error("Error al cargar los datos del artista");
                }
            } catch (error) {
                setIsError(true);
                console.error("Error al cargar datos del artista", error);
            }
        };

        fetchArtistData();
    }, [id, token]);

    const handleInputChangeName = (event) => {
        setNameData(event.target.value);
    };

    const handleInputChangeBio = (event) => {
        setBioData(event.target.value);
    };

    const handleInputChangeWebsite = (event) => {
        setWebsiteData(event.target.value);
    };

    const handleImageChange = (event) => {
        setImageData(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!nameData.trim()) {
            alert('El nombre del artista es un campo obligatorio.');
            return;
        }

        if (!submitting) {
            setSubmitting(true);
            const formData = new FormData();
            formData.append("name", nameData);

            if (bioData) {
                formData.append("bio", bioData);
            }
            if (websiteData) {
                formData.append("website", websiteData);
            }
            if (imageData) {
                formData.append("image", imageData);
            }

            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/${id}/`, {
                    method: "PATCH",
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                    body: formData,
                });

                if (!response.ok) {
                    if (response.status === 403) {
                        alert("No tienes los permisos para eliminar este recurso");
                        onClose();
                        return;
                    } else {
                        throw new Error("No se pudo actualizar el artista")
                    }
                }

                setIsSuccess(true);
                setTimeout(() => {
                    onClose(); 
                }, 1500); 
            } catch (error) {
                setIsError(true);
                console.error("Error al actualizar el artista", error);
            } finally {
                setSubmitting(false);
            }
        }
    };

    if (isSuccess) {
        return <SuccessAlert message="El recurso se ha actualizado exitosamente" />;
    }

    if (isError) {
        return <div>Error al cargar o actualizar el artista.</div>;
    }

    return (
        <form className="box m-4 p-4" onSubmit={handleSubmit} onClick={(event) => event.stopPropagation()}>
            <div className="field">
                <label className="label">Nombre</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        name="name"
                        value={nameData}
                        onChange={handleInputChangeName}
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Bio</label>
                <div className="control">
                    <textarea
                        className="input"
                        name="bio"
                        value={bioData}
                        onChange={handleInputChangeBio}
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Website</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        name="website"
                        value={websiteData}
                        onChange={handleInputChangeWebsite}
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Imagen:</label>
                <div className="control">
                    <input
                        className="input"
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleImageChange}
                    />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button
                        className="button is-success is-outlined"
                        type="submit"
                        disabled={submitting}
                    >   
                        <span className="icon is-small">
                             <i className="fas fa-check"></i></span>
                        <span>Actualizar Artista</span>
                    </button>
                    <button className="button is-primary is-outlined" onClick={(event) => {event.preventDefault(); onClose();}} >
                        <span>Cancelar</span>
                    </button>
                </div>
            </div>
        </form>
    );
}
EditArtist.propTypes = {
    id: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired
};

export default EditArtist;
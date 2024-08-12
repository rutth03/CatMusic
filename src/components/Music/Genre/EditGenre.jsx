import { useAuth } from "../../../context/AuthContext";
import { useState, useEffect } from "react";
import SuccessAlert from "../../Alerts/SuccessAlert";
import PropTypes from "prop-types";

function EditGenre({ id, onClose }) {
    /* Componente modal que recibe un id de genero y renderiza un formulario con la información del genero obtenido.
       Realiza la petición para editar el genero. */

    const { token } = useAuth("state");
    const [nameData, setNameData] = useState("");
    const [descriptionData, setDescriptionData] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchGenreData = async () => {
            if (!id) return;

            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/genres/${id}/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                if (response.ok) {
                    const genreData = await response.json();
                    setNameData(genreData.name || "");
                    setDescriptionData(genreData.description || "");
                } else {
                    throw new Error("Error al cargar los datos del género");
                }
            } catch (error) {
                setIsError(true);
                console.error("Error al cargar datos del género", error);
            }
        };

        fetchGenreData();
    }, [id, token]);

    const handleInputChangeName = (event) => {
        setNameData(event.target.value);
    };

    const handleInputChangeDescription = (event) => {
        setDescriptionData(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!nameData.trim()) {
            alert('El nombre del género es un campo obligatorio.');
            return;
        }

        if (!submitting) {
            setSubmitting(true);
            const payload = {
                name: nameData,
                description: descriptionData || null,
            };

            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/genres/${id}/`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) {
                    if (response.status === 403) {
                        alert("No tienes los permisos para modificar este recurso");
                        onClose();
                        return;
                    } else {
                        throw new Error("No se pudo actualizar el género");
                    }
                }

                setIsSuccess(true);
                setTimeout(() => {
                    onClose(); 
                }, 1500); 
            } catch (error) {
                setIsError(true);
                console.error("Error al actualizar el género", error);
            } finally {
                setSubmitting(false);
            }
        }
    };

    if (isSuccess) {
        return <SuccessAlert message="El recurso se ha actualizado exitosamente" />;
    }

    if (isError) {
        return <div>Error al cargar o actualizar el género.</div>;
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
                <label className="label">Descripción</label>
                <div className="control">
                    <textarea
                        className="input"
                        name="description"
                        value={descriptionData}
                        onChange={handleInputChangeDescription}
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
                        <span>Actualizar Género</span>
                    </button>
                    <button className="button is-primary is-outlined ml-2" onClick={(event) => {event.preventDefault(); onClose();}} >
                        <span>Cancelar</span>
                    </button>
                </div>
            </div>
        </form>
    );
}

EditGenre.propTypes = {
    id: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired
};

export default EditGenre;
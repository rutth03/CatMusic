import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import SuccessAlert from "../../Alerts/SuccessAlert";

function NewGenre() {
    /* Componente que renderiza un formulario y realiza la petición para agregar un nuevo genero. */

    const { token } = useAuth("state");
    const [genreData, setGenreData] = useState({ name: "" });
    const [descriptionData, setDescriptionData] = useState({ description: null });
    const [submitting, setSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleInputChangeGenre = (event) => {
        setGenreData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleInputChangeDescription = (event) => {
        setDescriptionData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!genreData.name.trim()) {
            alert('El nombre del género es un campo obligatorio.');
            return;
        }

        if (!submitting) {
            setSubmitting(true);
            const payload = {
                ...genreData,
                ...descriptionData,
            };

            fetch("https://sandbox.academiadevelopers.com/harmonyhub/genres/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify(payload),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Error al realizar la petición al endpoint");
                    }
                    setIsSuccess(true);
                })
                .catch((error) => {
                    console.error("Error creando el género", error);
                })
                .finally(() => {
                    setSubmitting(false);
                });
        }
    };

    if (isSuccess) {
        return <SuccessAlert message= "El recurso se ha creado exitosamente" redirectTo="/genres" />;
    }

    return (
        <form className="box m-4 p-4" onSubmit={handleSubmit}>
            <div className="field">
                <label className="label">Genero</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        name="name"
                        value={genreData.name}
                        onChange={handleInputChangeGenre}
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Descripción</label>
                <div className="control">
                    <textarea
                        className="input"
                        name="description"
                        value={descriptionData.description}
                        onChange={handleInputChangeDescription}
                    />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button
                        className="button is-primary"
                        type="submit"
                        disabled={submitting}
                    >
                        Crear Género
                    </button>
                </div>
            </div>
        </form>
    );
}

export default NewGenre;
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import SuccessAlert from "../../Alerts/SuccessAlert";

function NewPlaylist(){
    /* Componente que renderiza un formulario y realiza la petición para agregar una nueva playlist. */

    const { token } = useAuth("state");
    const [nameData, setGenreData] = useState({ name: "" });
    const [publicData, setPublicData] = useState( true );
    const [descriptionData, setDescriptionData] = useState({ description: null });
    const [submitting, setSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleInputChangeName = (event) => {
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
    const handlePublicDataChange = (event) => {
        setPublicData(event.target.value === "true");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!nameData.name.trim()) {
            alert('El nombre de la PLaylist es un campo obligatorio.');
            return;
        }

        if (!submitting) {
            setSubmitting(true);
            const payload = {
                ...nameData,
                ...descriptionData,
                public: publicData,
            };

            fetch("https://sandbox.academiadevelopers.com/harmonyhub/playlists/", {
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
        return <SuccessAlert  message= "El recurso se ha creado exitosamente" redirectTo="/playlists" />;
    }

    return (
        <form className="box m-4 p-4" onSubmit={handleSubmit}>
            <div className="field">
                <label className="label">Nombre de la Playlist</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        name="name"
                        value={nameData.name}
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
                        value={descriptionData.description}
                        onChange={handleInputChangeDescription}
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Privacidad</label>
                <div className="control">
                    <div className="select is-fullwidth">
                        <select
                            name="publicData"
                            value={publicData.toString()}
                            onChange={handlePublicDataChange}
                        >
                            <option value="true">Pública</option>
                            <option value="false">Privada</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button
                        className="button is-primary"
                        type="submit"
                        disabled={submitting}
                    >
                        Crear Playlist
                    </button>
                </div>
            </div>
        </form>
    );
}

export default NewPlaylist
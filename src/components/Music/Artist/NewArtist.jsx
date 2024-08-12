import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import SuccessAlert from "../../Alerts/SuccessAlert";

function NewArtist() {
    /* Componente que renderiza un formulario y realiza la petición para agregar un nuevo artista. */

    const { token } = useAuth("state");
    const [nameData, setNameData] = useState({ name: "" });
    const [bioData, setBioData] = useState({ bio: "" });
    const [websiteData, setWebsiteData] = useState({ website: "" });
    const [imageData, setImageData] = useState({ image: "" });
    const [submitting, setSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleInputChangeName = (event) => {
        setNameData({ name: event.target.value });
    };

    const handleInputChangeBio = (event) => {
        setBioData({ bio: event.target.value });
    };

    const handleInputChangeWebsite = (event) => {
        setWebsiteData({ website: event.target.value });
    };

    const handleImageChange = (event) => {
        setImageData({ image: event.target.files[0] });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!nameData.name.trim()) {
            alert('El nombre del artista es un campo obligatorio.');
            return;
        }

        if (!submitting) {
            setSubmitting(true);
            const newForm = new FormData();
            newForm.append("name", nameData.name);

            if(bioData.bio){
                newForm.append("bio", bioData.bio);
            }
            if(websiteData.website){
                newForm.append("website", websiteData.website);
            }
            if (imageData.image) {
                newForm.append("image", imageData.image);
            }
            fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/`, {
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`,
                },
                body: newForm,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("No se pudo agregar el artista");
                    }else{
                        setIsSuccess(true);
                    }
                })
                .catch((error) => {
                    console.error("Error al agregar el artista", error);
                })
                .finally(() => {
                    setSubmitting(false);
                });
        }
    };
    if (isSuccess) {
        return <SuccessAlert message= "El recurso se ha creado exitosamente" redirectTo="/artists" />;
    }

    return (
        <form className="box m-4 p-4" onSubmit={handleSubmit}>
            <div className="field">
                <label className="label">Artista</label>
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
                <label className="label">Bio</label>
                <div className="control">
                    <textarea
                        className="input"
                        name="bio"
                        value={bioData.bio}
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
                        value={websiteData.website}
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
                        className="button is-primary"
                        type="submit"
                        disabled={submitting}
                    >
                        Agregar Artista
                    </button>
                </div>
            </div>
        </form>
    );
}

export default NewArtist;
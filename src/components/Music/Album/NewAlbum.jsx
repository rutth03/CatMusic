/* eslint-disable no-unused-vars */
import { useAuth } from "../../../context/AuthContext";
import { useState, useEffect } from "react";
import SuccessAlert from "../../Alerts/SuccessAlert";

function NewAlbum(){
    /* Componente que renderiza un formulario y realiza la petición para agregar un nuevo albúm. */

    const { token } = useAuth("state");
    const [titleData, setTitleData] = useState({ title: "" });
    const [yearData, setYearData] = useState({ year: null });
    const [coverData, setCoverData] = useState({ cover: "" });
    const [artists, setArtists] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState([]);
    const [loadingArtists, setLoadingArtists] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const fetchAllArtists = async () => {
            let allArtists = [];
            let nextUrl = `${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/`;

            try {
                while (nextUrl) {
                    const response = await fetch(nextUrl);
                    if (!response.ok) {
                        throw new Error("No se pudieron cargar los artistas");
                    }
                    const data = await response.json();
                    allArtists = [...allArtists, ...data.results];
                    nextUrl = data.next; 
                }
                setArtists(allArtists);
            } catch (error) {
                console.error("Error al realizar la petición", error);
            } finally {
                setLoadingArtists(false);
            }
        };

        fetchAllArtists();
    }, []);

    const handleInputChangeTitle = (event) => {
        setTitleData({ title: event.target.value });
    };

    const handleInputChangeYear = (event) => {
        setYearData({ year: event.target.value });
    };

    const handleImageChange = (event) => {
        setCoverData({ cover: event.target.files[0] });
    };

    function handleArtistChange(event) {
        const artistId = event.target.value;
        const artist = artists.find((art) => art.id === parseInt(artistId));
        setSelectedArtist(artist);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!titleData.title.trim()) {
            alert('El título es un campo obligatorio.');
            return;
        }
        if (!selectedArtist || !selectedArtist.id) {
            alert('El artista es requerido');
            return;
        }

        if (!submitting) {
            setSubmitting(true);
            const newForm = new FormData();
            newForm.append("title", titleData.title);
            newForm.append("artist", selectedArtist.id);

            if(yearData.year) {
                newForm.append("year", yearData.year);
            }  
            if (coverData.cover) {
                newForm.append("cover", coverData.cover);
            }
            fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/albums/`, {
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`,
                },
                body: newForm,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("No se pudo agregar el album");
                    }
                    setIsSuccess(true);
                })
                .catch((error) => {
                    console.error("Error al agregar el album", error);
                })
                .finally(() => {
                    setSubmitting(false);
                });
        }
    };

    if (isSuccess) {
        return <SuccessAlert message= "El recurso se ha creado exitosamente" redirectTo="/albums" />;
    }

    return (
        <form className="box m-4 p-4" onSubmit={handleSubmit}>
            <div className="field">
                <label className="label">Album</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        name="title"
                        value={titleData.title}
                        onChange={handleInputChangeTitle}
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Año</label>
                <div className="control">
                    <input
                            className="input"
                            type="number"
                            name="year"
                            value={yearData.year}
                            onChange={handleInputChangeYear}
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Portada:</label>
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
                <label className="label">Artistas:</label>
                <div className="select is-fullwidth">
                    <select
                        value={selectedArtist ? selectedArtist.id : ""}
                        onChange={handleArtistChange}
                    >
                        <option value="">Selecciona un artista</option>
                        {artists.map((artist) => (
                            <option key={artist.id} value={artist.id}>
                                {artist.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button
                        className="button is-primary"
                        type="submit"
                        disabled={submitting}
                    >
                        Agregar Albúm
                    </button>
                </div>
            </div>
        </form>
    );
}

export default NewAlbum
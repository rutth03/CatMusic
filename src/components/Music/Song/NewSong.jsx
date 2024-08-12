/* eslint-disable no-unused-vars */
import { useAuth } from "../../../context/AuthContext";
import { useState, useEffect } from "react";
import SuccessAlert from "../../Alerts/SuccessAlert";

function NewSong() {
    /* Componente que renderiza un formulario y realiza la petición para agregar una nueva canción. */

    const { token } = useAuth("state");
    const [titleData, setTitleData] = useState({ title: "" });
    const [yearData, setYearData] = useState({ year: null });
    const [songFileData, setSongFileData] = useState({ song_file: null });
    const [albums, setAlbums] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState({ id: "", artist: null });
    const [loadingAlbums, setLoadingAlbums] = useState(true);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [loadingGenres, setLoadingGenres] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const fetchAllAlbums = async () => {
            let allAlbums = [];
            let nextUrl = `${import.meta.env.VITE_API_BASE_URL}harmonyhub/albums/`;

            try {
                while (nextUrl) {
                    const response = await fetch(nextUrl);
                    if (!response.ok) {
                        throw new Error("No se pudieron cargar los álbumes");
                    }
                    const data = await response.json();
                    allAlbums = [...allAlbums, ...data.results];
                    nextUrl = data.next;
                }
                setAlbums(allAlbums);
            } catch (error) {
                console.error("Error al cargar los álbumes", error);
            } finally {
                setLoadingAlbums(false);
            }
        };

        const fetchAllGenres = async () => {
            let allGenres = [];
            let nextUrl = `${import.meta.env.VITE_API_BASE_URL}harmonyhub/genres/`;

            try {
                while (nextUrl) {
                    const response = await fetch(nextUrl);
                    if (!response.ok) {
                        throw new Error("No se pudieron cargar los géneros");
                    }
                    const data = await response.json();
                    allGenres = [...allGenres, ...data.results];
                    nextUrl = data.next;
                }
                setGenres(allGenres);
            } catch (error) {
                console.error("Error al cargar los géneros", error);
            } finally {
                setLoadingGenres(false);
            }
        };

        fetchAllAlbums();
        fetchAllGenres();
    }, []);

    const handleInputChangeTitle = (event) => {
        setTitleData({ title: event.target.value });
    };

    const handleInputChangeYear = (event) => {
        setYearData({ year: event.target.value });
    };

    const handleFileChange = (event) => {
        setSongFileData({ song_file: event.target.files[0] });
    };

    function handleAlbumChange(event) {
        const albumId = event.target.value;
        const album = albums.find((alb) => alb.id === parseInt(albumId));
        setSelectedAlbum({
            id: album ? album.id : "",
            artist: album ? album.artist : null
        });
    }

    function handleGenreChange(event) {
        const genreId = parseInt(event.target.value);
        setSelectedGenres((prevSelectedGenres) =>
            prevSelectedGenres.includes(genreId)
                ? prevSelectedGenres.filter((id) => id !== genreId)
                : [...prevSelectedGenres, genreId]
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!titleData.title.trim()) {
            alert('El título es un campo obligatorio.');
            return;
        }

        if (!submitting) {
            setSubmitting(true);
            const newForm = new FormData();
            newForm.append("title", titleData.title);

            if(yearData.year) {
                newForm.append("year", yearData.year);
            }  
                
            if(selectedAlbum.id){
                newForm.append("album", selectedAlbum.id);
            }  

            if (songFileData.song_file) {
                newForm.append("song_file", songFileData.song_file);
            }

            try {
                // Paso 1: Crear la canción
                const songResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/`, {
                    method: "POST",
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                    body: newForm,
                });

                if (!songResponse.ok) {
                    throw new Error("No se pudo agregar la canción");
                }
                
                const songData = await songResponse.json();
                const songId = songData.id;

                // Paso 2: Asignar el artista a la canción
                if(selectedAlbum.artist){
                    const artistData = {
                        role: "primary",
                        song: songId,
                        artist: selectedAlbum.artist
                    };
    
                    const artistResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/song-artists/`, {
                        method: "POST",
                        headers: {
                            Authorization: `Token ${token}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(artistData),
                    });
    
                    if (!artistResponse.ok) {
                        throw new Error("No se pudo asignar el artista a la canción");
                    }
                } 

                // Paso 3: Asignar los géneros a la canción
                if(selectedGenres){
                    for (const genreId of selectedGenres) {
                        const genreData = {
                            song: songId,
                            genre: genreId
                        };
    
                        const genreResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/song-genres/`, {
                            method: "POST",
                            headers: {
                                Authorization: `Token ${token}`,
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(genreData),
                        });
    
                        if (!genreResponse.ok) {
                            throw new Error(`No se pudo asignar el género ${genreId} a la canción`);
                        }
                    }
                }
                setIsSuccess(true);
                console.log("Canción, artista y géneros asignados correctamente");
            } catch (error) {
                console.error("Error al agregar la canción, asignar el artista o asignar los géneros", error);
            } finally {
                setSubmitting(false);
            }
        }
    };

    if (isSuccess) {
        return <SuccessAlert  message= "El recurso se ha creado exitosamente" redirectTo="/songs" />;
    }

    return (
        <div>
            <form className="box m-4 p-4" onSubmit={handleSubmit}>
                <div className="field mb-4">
                    <label className="label">Canción</label>
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
                <div className="field mb-4">
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
                <div className="field mb-4">
                    <label className="label">Archivo:</label>
                    <div className="control">
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                <div className="field mb-4">
                    <label className="label">Álbumes:</label>
                    <div className="select is-fullwidth">
                        <select
                            value={selectedAlbum.id}
                            onChange={handleAlbumChange}
                        >
                            <option value="">Selecciona un álbum</option>
                            {albums.map((album) => (
                                <option key={album.id} value={album.id}>
                                    {album.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="field mb-4">
                    <label className="label">Géneros:</label>
                    <div className="select is-fullwidth" style={{ height: '100px' }}>
                        <select
                            multiple
                            size="3"
                            onChange={handleGenreChange}
                            value={selectedGenres}
                        >
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="field mb-4">
                    <div className="control">
                        <button
                            className="button is-primary"
                            type="submit"
                            disabled={submitting || loadingGenres || loadingAlbums}
                        >
                            Agregar Canción
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default NewSong;
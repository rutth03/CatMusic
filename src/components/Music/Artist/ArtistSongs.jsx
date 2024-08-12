import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetSong from "../Song/GetSong";

function ArtistSongs() {
    /* Componente que capta el parametro de ruta 'id' y obtiene todas las canciones del artista con ese identificador.
       Renderiza todas las canciones encontradas con el componente GetSong. */

    const { id } = useParams();
    const [data, setData] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setIsError(false);

            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/${id}/`);
                if (response.ok) {
                    const result = await response.json();
                    setData(result);
                } else {
                    throw new Error('Error en la respuesta del servidor');
                }
            } catch (error) {
                setIsError(true);
                console.error('Error al cargar datos:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    if (isError) {
        return (
            <div className="my-5">
                <h2 className="title">Error al cargar las canciones del artista.</h2>
            </div>
        );
    }

    if (!data || !Array.isArray(data.songs)) {
        return <p>No hay canciones disponibles</p>;
    }

    const songsForArtist = data.songs;

    return (
        <div>
            <div className="my-5">
                <h2 className="title">Canciones</h2>
                <ul>
                    {songsForArtist.length > 0 ? (
                        songsForArtist.map(songId => (
                            <li key={songId} className="column is-two-third">
                                <GetSong songId={songId} />
                            </li>
                        ))
                    ) : (
                        <p>No hay canciones disponibles</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default ArtistSongs;
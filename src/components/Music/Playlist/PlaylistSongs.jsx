import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetSong from "../Song/GetSong";

function PlaylistSongs() {
    /* Componente que capta el parametro de ruta 'id' y obtiene todas las canciones de la playlist con ese identificador.
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
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/playlists/${id}/`);
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
                <h2 className="title">Error al cargar la playlist.</h2>
            </div>
        );
    }

    if (!data || !Array.isArray(data.entries) || data.entries.length === 0) {
        console.log("datos:",data);
        return (
            <div className="my-5">
                <h2 className="title">{data ? data.name : 'Sin nombre'}</h2>
                <p>No hay canciones en esta playlist.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="my-5">
                <div className="is-flex is-justify-content-space-between is-align-items-center">
                    <h2 className="title">{data.name}</h2>
                    <button className="button is-success is-outlined">Añadir canción</button>
                </div>
                <ul>
                    {console.log(data)}
                    {data.entries.map(entryId => (
                        <li key={entryId} className="column is-two-thirds">
                            <GetSong songId={entryId} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PlaylistSongs;
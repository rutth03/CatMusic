import useFetch from "../../../hooks/useFetch";
import PlaylistCard from "./PlaylistCard";
import { useEffect } from "react";

function Playlist() {
    const [{ data, isError, isLoading }, doFetch] = useFetch(
        "https://sandbox.academiadevelopers.com/harmonyhub/playlists/",
        {}
    );

    useEffect(() => {
        doFetch();
    }, []);

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar los albumes.</p>;
    if (!data) return <p>No hay albumes disponibles</p>;

    return (
        <div>
            <div className="my-5">
                <div className="is-flex is-justify-content-space-between is-align-items-center">
                    <h2 className="title">Mis playlists</h2>
                    <button className="button is-success is-outlined">Nueva Playlist</button>
                </div>
                    {data.results.map((playlist) => (
                        <div key={playlist.id} className="column is-two-third">
                            <PlaylistCard playlist={playlist} />
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Playlist;
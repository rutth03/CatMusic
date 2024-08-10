import useFetch from "../../../hooks/useFetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import GetSong from "../Song/GetSong";
import PropTypes from "prop-types";

function PlaylistSongs() {
    const { id } = useParams();

    // Use the endpoint for the specific playlist
    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `https://sandbox.academiadevelopers.com/harmonyhub/playlists/${id}`,
        {}
    );

    useEffect(() => {
        doFetch();
    }, [id]);

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    if (isError) {
        return (<div className="my-5">
                <h2 className="title">{data.name}</h2><p>Error al cargar la playlist.</p></div>)
    }

    if (!data || !data.entries || data.entries.length === 0) {
        return (<div className="my-5">
                <h2 className="title">{data.name}</h2><p> No hay canciones en esta playlist.</p></div>)
    }

    return (
        <div>
            <div className="my-5">
                <div className="is-flex is-justify-content-space-between is-align-items-center">
                    <h2 className="title">{data.name}</h2>
                    <button className="button is-success is-outlined">Añadir canción</button>
                </div>
                <ul>
                    {data.entries.map(entryId => (
                        <li key={entryId} className="column is-two-third">
                            <GetSong songId={entryId} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

PlaylistSongs.propTypes = {
    id: PropTypes.number.isRequired,
};

export default PlaylistSongs;
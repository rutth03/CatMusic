/* eslint-disable no-unused-vars */
import useFetch from "../../../hooks/useFetch";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import GetSong from "../Song/GetSong";

function GenreSongs() {
    const { id } = useParams();
    const genreId = parseInt(id, 10);

    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `https://sandbox.academiadevelopers.com/harmonyhub/song-genres`,
        {}
    );

    useEffect(() => {
        doFetch();
    }, []);

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    if (isError) {
        return <p>Error al cargar los géneros.</p>;
    }

    return (
        <div>
            <div className="my-5">
                <h2 className="title">Canciones</h2>
                <ul>
                    {data && data.results.length > 0 ? (
                        data.results.filter(songGenre => songGenre.genre === genreId).length > 0 ? (
                            data.results.filter(songGenre => songGenre.genre === genreId).map((songGenre) => (
                                <div key={songGenre.id} className="column is-two-third">
                                    <GetSong songId={songGenre.song} />
                                </div>
                            ))
                        ) : (
                            <p>No hay canciones disponibles</p>
                        )
                    ) : (
                        <p>No hay canciones disponibles</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

GenreSongs.propTypes = {
    id: PropTypes.number.isRequired,
};

export default GenreSongs;
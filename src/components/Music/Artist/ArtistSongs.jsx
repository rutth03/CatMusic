/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import useFetch from "../../../hooks/useFetch";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import GetSong from "../Song/GetSong";

function ArtistSongs() {
    const { id } = useParams();
    const artistId = parseInt(id, 10);

    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `https://sandbox.academiadevelopers.com/harmonyhub/song-artists`,
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
                        data.results.filter(songArtist => songArtist.artist === artistId).length > 0 ? (
                            data.results.filter(songArtist => songArtist.artist === artistId).map((songArtist) => (
                                <div key={songArtist.id} className="column is-two-third">
                                    <GetSong songId={songArtist.song} />
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

ArtistSongs.propTypes = {
    id: PropTypes.number.isRequired,
};

export default ArtistSongs;
import { useState } from "react";
import { useParams } from "react-router-dom";
import GetSong from "../Song/GetSong";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import useFetch from "../../../hooks/useFetch";

function GenreSongs() {
    /* Componente que capta el parametro de ruta 'id' y obtiene todas las canciones del genero con ese identificador.
       Renderiza todas las canciones encontradas con el componente GetSong. */

    const { id } = useParams();
    const genreId = parseInt(id, 10);
    const [page, setPage] = useState(1);

    const { data: songsData, nextUrl, isError, isLoading } = useFetch(
        `${import.meta.env.VITE_API_BASE_URL}harmonyhub/song-genres/`,
        page
    );

    const fetchMoreSongs = () => {
        if (nextUrl && !isLoading) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const lastSongElementRef = useInfiniteScroll(fetchMoreSongs, [nextUrl, isLoading]);

    if (isError) return <p>Error al cargar canciones.</p>;

    const filteredSongs = Array.isArray(songsData)
        ? songsData.filter(songGenre => songGenre.genre === genreId)
        : [];

    if (!filteredSongs.length && !isLoading) return <p>No hay canciones disponibles</p>;

    return (
        <div>
            <div className="my-5">
                <h2 className="title">Canciones</h2>
                <ul>
                    {filteredSongs.length > 0 ? (
                        filteredSongs.map((songGenre, index) => {
                            const isLastElement = filteredSongs.length === index + 1;
                            return (
                                <div
                                    key={songGenre.song}
                                    className="column is-two-third"
                                    ref={isLastElement ? lastSongElementRef : null}
                                >
                                    <GetSong songId={songGenre.song} />
                                </div>
                            );
                        })
                    ) : (
                        <p>No hay canciones disponibles</p>
                    )}
                </ul>
            </div>
            {isLoading && <p>Cargando más canciones...</p>}
        </div>
    );
}

export default GenreSongs;
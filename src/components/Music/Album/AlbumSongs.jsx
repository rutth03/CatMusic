import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useState } from "react";
import SongCard from "../Song/SongCard";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";

function AlbumSongs() {
    /* Componente que capta el parametro de ruta 'id' y obtiene todas las canciones del artista con ese identificador.
       Renderiza todas las canciones encontradas con el componente SongCard. */

    const { id } = useParams();
    const [page, setPage] = useState(1);
    const { data: albums, nextUrl, isError, isLoading } = useFetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/albums/${id}/songs`, page);

    const fetchMoreSongs = () => {
        if (nextUrl && !isLoading) {
            setPage(prevPage => prevPage + 1);
        }
    };
    const lastSongElementRef = useInfiniteScroll(fetchMoreSongs, [nextUrl, isLoading]);

    if (isError) return <p>Error al cargar canciones del album.</p>;
    if (!albums.length && !isLoading) return <p>No hay canciones disponibles</p>;

    return (
        <div>
             <div className="my-5">
                <h2 className="title">Canciones</h2>

                <ul>  
                {albums.map((song, index) => {
                        return(
                            <div
                                key={song.id}
                                ref={albums.length === index + 1 ? lastSongElementRef : null}
                                className="column is-two-third"
                            >
                                <SongCard song={song} />
                            </div>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default AlbumSongs
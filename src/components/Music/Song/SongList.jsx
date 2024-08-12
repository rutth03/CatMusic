/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import MySongs from "./MySongs";
import useFetch from "../../../hooks/useFetch";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { useState } from "react";

function SongList() {
    /* Componente que obtiene todas las canciones creadas y las renderiza usando MySongs. Contiene un boton para agregar
       una nueva canción. */

    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const { data: songs, nextUrl, isError, isLoading } = useFetch(
        `${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/`,
        page
    );

    const fetchMoreSongs = () => {
        if (nextUrl && !isLoading) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const lastSongElementRef = useInfiniteScroll(fetchMoreSongs, [nextUrl, isLoading]);

    if (isError) return <p>Error al cargar las canciones.</p>;
    if (!songs.length && !isLoading) return <p>No hay canciones disponibles</p>;

    return (
        <>
            <div className="my-5">
                <div className="is-flex is-justify-content-space-between is-align-items-center">
                    <h2 className="title">Lista de Canciones</h2>
                    <button className="button is-success is-outlined" onClick={() => navigate(`/songs/new`)}>Nueva canción</button>
                </div>
                <ul>
                    {songs.map((song, index) => {
                        return(
                            <div
                            key={song.id}
                            ref={songs.length === index + 1 ? lastSongElementRef : null}
                            className="column is-two-third">
                                <MySongs song={song} />
                            </div>
                        );
                    })}
                </ul>
                    {isLoading && <p>Cargando más canciones...</p>}
            </div>
        </>
    );
}

export default SongList;
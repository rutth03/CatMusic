import useFetch from "../../../hooks/useFetch";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlaylistCard from "./PlaylistCard";

function Playlist() {
    /* Componente que obtiene todas las playlists creadas y las renderiza usando PlaylistCard. Contiene un boton para 
       agregar una nueva playlist. */

    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const { data: playlists, nextUrl, isError, isLoading } = useFetch(
        `${import.meta.env.VITE_API_BASE_URL}harmonyhub/playlists/`,
        page
    );

    const fetchMorePlaylists = () => {
        if (nextUrl && !isLoading) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const lastPlaylistElementRef = useInfiniteScroll(fetchMorePlaylists, [nextUrl, isLoading]);


    if (isError) return <p>Error al cargar playlists.</p>;
    if (!playlists.length && !isLoading) return <p>No hay playlists disponibles</p>;

    return (
        <div>
            <div className="my-5">
                <div className="is-flex is-justify-content-space-between is-align-items-center">
                    <h2 className="title">Mis playlists</h2>
                    <button className="button is-success is-outlined" onClick={() => navigate(`/playlists/new`)}>Nueva Playlist</button>
                </div>
                <div className="columns" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                    {playlists.map((playlist, index) => {
                        return(
                            <div
                            key={playlist.id}
                            ref={playlists.length === index + 1 ? lastPlaylistElementRef : null}
                            className="column is-two-third"
                            style={{ display: 'flex', justifyContent: 'center' }}
                        >
                                <PlaylistCard playlist={playlist} />
                            </div>
                        );
                        
                    })}
                </div>
                {isLoading && <p>Cargando más playlists...</p>}
            </div>
        </div>
    );
}

export default Playlist;
import AlbumCard from "./AlbumCard";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import { useNavigate } from "react-router-dom";

function AlbumList() {
    /* Componente que obtiene todos los albumes creados y las renderiza usando AlbumCard. Contiene un boton para agregar
       un nuevo album. */

    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const { data: albums, nextUrl, isError, isLoading } = useFetch(
        `${import.meta.env.VITE_API_BASE_URL}harmonyhub/albums/`,
        page
    );

    const fetchMoreAlbums = () => {
        if (nextUrl && !isLoading) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const lastAlbumElementRef = useInfiniteScroll(fetchMoreAlbums, [nextUrl, isLoading]);

    if (isError) return <p>Error al cargar los albumes.</p>;
    if (!albums.length && !isLoading) return <p>No hay albumes disponibles</p>;


    return (
        <div>
            <div className="my-5">
                <div className="is-flex is-justify-content-space-between is-align-items-center">
                    <h2 className="title">Albumes</h2>
                    <button className="button is-success is-outlined" onClick={() => navigate(`/albums/new`)}>Nuevo Albúm</button>
                </div>
                <div className="columns is-multiline" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                    {albums.map((album, index) => {
                            return(
                                <div
                                    key={album.id}
                                    ref={albums.length === index + 1 ? lastAlbumElementRef : null}
                                    className="column is-two-third"
                                    style={{ display: 'flex', justifyContent: 'center' }}
                                >
                                    <AlbumCard album={{...album,  year: album.year ?? 'Desconocido'}} />
                                </div>
                            );
                    })}
                </div>
                {isLoading && <p>Cargando más Albumes...</p>}
            </div>
        </div>
    );
}

export default AlbumList;
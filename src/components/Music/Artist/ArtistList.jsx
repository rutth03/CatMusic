import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArtistCard from "./ArtistCard";
import useFetch from "../../../hooks/useFetch";
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';

function ArtistList() {
    /* Componente que obtiene todas los artistas creados y los renderiza usando ArtistCard. Contiene un boton para 
       agregar un nuevo artista. */

    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const { data: artists, nextUrl, isError, isLoading } = useFetch(
        `${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/`,
        page
    );

    const fetchMoreArtists = () => {
        if (nextUrl && !isLoading) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const lastArtistElementRef = useInfiniteScroll(fetchMoreArtists, [nextUrl, isLoading]);

    if (isError) return <p>Error al cargar Artistas.</p>;
    if (!artists.length && !isLoading) return <p>No hay artistas disponibles</p>;

    return(
        <div>
            <div className="is-flex is-justify-content-space-between is-align-items-center">
                <h2 className="title">Artistas</h2>
                <button className="button is-success is-outlined" onClick={() => navigate(`/artists/new`)}>Nuevo artista</button>
            </div>
            <div className="my-5">
                <div className="columns is-multiline" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                    {artists.map((artist, index) => {
                        return(
                            <div
                                key={artist.id}
                                ref={artists.length === index + 1 ? lastArtistElementRef : null}
                                className="column is-two-third"
                                style={{ display: 'flex', justifyContent: 'center' }}
                            >
                                <ArtistCard artist={artist} />
                            </div>
                        );
                    })}
                </div>
                {isLoading && <p>Cargando más Artistas...</p>}
            </div>
        </div>
    );
}

export default ArtistList
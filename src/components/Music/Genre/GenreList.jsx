/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import GenreCard from "./GenreCard";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { useState } from "react";

function GenreList() {
    /* Componente que obtiene todas los generos creados y los renderiza usando GenreCard. Contiene un boton para 
       agregar un nuevo Genero. */

    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const { data: genres, nextUrl, isError, isLoading } = useFetch(
        `${import.meta.env.VITE_API_BASE_URL}harmonyhub/genres/`,
        page
    );

    const fetchMoreGenres = () => {
        if (nextUrl && !isLoading) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const lastGenreElementRef = useInfiniteScroll(fetchMoreGenres, [nextUrl, isLoading]);

    if (isError) return <p>Error al cargar los Generos.</p>;
    if (!genres.length && !isLoading) return <p>No hay generos disponibles</p>;

    return (
        <div>
            <div className="my-5">
                <div className="is-flex is-justify-content-space-between is-align-items-center">
                    <h2 className="title">Generos</h2>
                    <button className="button is-success is-outlined" onClick={() => navigate(`/genres/new`)}>Nuevo Género</button>
                </div>
                <ul>
                    {genres.map((genre, index) => {
                        return(
                            <div
                            key={genre.id}
                            ref={genres.length === index + 1 ? lastGenreElementRef : null}
                            className="column is-two-third"
                        >
                                <GenreCard genre={genre} />
                            </div>
                        );
                    })}
                </ul>
                {isLoading && <p>Cargando más generos...</p>}
            </div>
        </div>
    );
}

export default GenreList;
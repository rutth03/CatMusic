/* eslint-disable react-hooks/exhaustive-deps */
import useFetch from "../../../hooks/useFetch";
import GenreCard from "./GenreCard";

import { useEffect } from "react";

function GenreList() {
    const [{ data, isError, isLoading }, doFetch] = useFetch(
        "https://sandbox.academiadevelopers.com/harmonyhub/genres/",
        {}
    );

    useEffect(() => {
        doFetch();
    }, []);

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar los generos.</p>;
    if (!data) return <p>No hay generos disponibles</p>;

    return (
        <div>
            <div className="my-5">
                <h2 className="title">Generos</h2>
                <ul>
                    {data.results.map((genre) => (
                        <div key={genre.id} className="column is-two-third">
                            <GenreCard genre={genre} />
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default GenreList;
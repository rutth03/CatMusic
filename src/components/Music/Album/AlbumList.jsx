/* eslint-disable react-hooks/exhaustive-deps */
import useFetch from "../../../hooks/useFetch";
import AlbumCard from "./AlbumCard";
import { useEffect } from "react";

function AlbumList() {
    const [{ data, isError, isLoading }, doFetch] = useFetch(
        "https://sandbox.academiadevelopers.com/harmonyhub/albums/",
        {}
    );

    useEffect(() => {
        doFetch();
    }, []);

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar los albumes.</p>;
    if (!data) return <p>No hay albumes disponibles</p>;

    return (
        <div>
            <div className="my-5">
                <div className="is-flex is-justify-content-space-between is-align-items-center">
                    <h2 className="title">Albumes</h2>
                    <button className="button is-success is-outlined">Nuevo Albúm</button>
                </div>
                <div className="columns is-multiline">
                    {data.results.map((album) => (
                        <div key={album.id} className="column is-one-quarter">
                            <AlbumCard album={{
                        ...album, 
                        year: album.year ?? 'Desconocido'
                    }}  />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AlbumList;
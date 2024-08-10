/* eslint-disable react-hooks/exhaustive-deps */
import useFetch from "../../../hooks/useFetch";
import SongCard from "./SongCard";

import { useEffect } from "react";

function SongList() {
    const [{ data, isError, isLoading }, doFetch] = useFetch(
        "https://sandbox.academiadevelopers.com/harmonyhub/songs/",
        {}
    );

    useEffect(() => {
        doFetch();
    }, []);

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar las canciones.</p>;
    if (!data) return <p>No hay canciones disponibles</p>;

    return (
        <div>
            <div className="my-5">
                <div className="is-flex is-justify-content-space-between is-align-items-center">
                    <h2 className="title">Lista de Canciones</h2>
                    <button className="button is-success is-outlined">Nueva canción</button>
                </div>
                <ul>
                    {data.results.map((song) => (
                        <div key={song.id} className="column is-two-third">
                            <SongCard song={song} />
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SongList;
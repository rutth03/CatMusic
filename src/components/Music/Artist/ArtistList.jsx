import useFetch from "../../../hooks/useFetch";
import { useEffect } from "react";
import ArtistCard from "./ArtistCard";

function ArtistList() {
    const [{ data, isError, isLoading }, doFetch] = useFetch(
        "https://sandbox.academiadevelopers.com/harmonyhub/artists/",
        {}
    );

    useEffect(() => {
        doFetch();
    }, []);

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar artistas.</p>;
    if (!data) return <p>No hay artistas disponibles</p>;

    return (
        <div>
            <div className="is-flex is-justify-content-space-between is-align-items-center">
                <h2 className="title">Artistas</h2>
                <button className="button is-success is-outlined">Nuevo artista</button>
            </div>
            <div className="my-5">
                <div className="columns is-multiline">
                            {data.results.map((artist) => (
                                <div key={artist.id} className="column is-half">
                                    <ArtistCard artist={artist} />
                                </div>
                            ))}
                </div>
            </div>
        </div>
    );
}

export default ArtistList
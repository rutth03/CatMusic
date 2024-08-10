/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useEffect } from "react";
import SongCard from "../Song/SongCard";

function AlbumSongs() {
    const { id } = useParams();

    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `https://sandbox.academiadevelopers.com/harmonyhub/albums/${id}/songs`,
        {}
    );

    useEffect(() => {
        doFetch();
    }, [id]);


    return (
        <div>
             <div className="my-5">
                <h2 className="title">Canciones</h2>
                <ul>  {data && data.results.length > 0 ? (
                        data.results.map((song) => (
                            <div key={song.id} className="column is-two-third">
                                <SongCard song={song} />
                            </div>
                        ))
                    ) : (
                        <p>No hay canciones disponibles</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default AlbumSongs
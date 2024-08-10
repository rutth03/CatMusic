import useFetch from "../../../hooks/useFetch";
import { useEffect } from "react";
import SongCard from "./SongCard";
import PropTypes from "prop-types";

function GetSong({ songId }) {
    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `https://sandbox.academiadevelopers.com/harmonyhub/songs/${songId}`,
        {}
    );

    useEffect(() => {
        doFetch();
    }, [songId]);

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    if (isError) {
        return <p>Error al cargar la canción.</p>;
    }

    return data ? <SongCard song={data} /> : <p>No hay datos de la canción.</p>;
}

GetSong.propTypes = {
    songId: PropTypes.number.isRequired,
};

export default GetSong
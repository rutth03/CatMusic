import { useEffect, useState } from "react";
import SongCard from "./SongCard";
import PropTypes from "prop-types";

function GetSong({ songId }) {
    /* Componente que recibe el id de una cancion, realiza una petición y obtiene su información. El resultado es pasado 
       al componente SongCard para ser renderizado. */

    const [data, setData] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (songId === undefined || songId === null) {
                console.error('songId is undefined or null:', songId);
                setIsError(true);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setIsError(false);

            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/${songId}/`);
                if (response.ok) {
                    const result = await response.json();
                    setData(result);
                } else {
                    throw new Error('Error en la respuesta del servidor');
                }
            } catch (error) {
                setIsError(true);
                console.error('Error al cargar datos:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
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
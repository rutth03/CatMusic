import PropTypes from "prop-types";
import iconDefault from '../../../assets/Avatar.svg';
import { useState, useEffect } from "react";

function DetailArtist({ id, onClose }){
    /* Componente modal que recibe un id de artista y renderiza toda la información del artista obtenido. */

    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/${id}/`);
                if (!response.ok) {
                    throw new Error("Error fetching artist data");
                }
                const data = await response.json();
                setArtist(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArtist();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="modal is-active" onClick={(event) => event.stopPropagation()}>
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-content">
                <div className="box">
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                    {artist && (
                        <div>
                            <figure className="image is-128x128">
                                <img
                                    src={artist.image ? artist.image : iconDefault}
                                    alt={artist.name}
                                />
                            </figure>
                            <h1 className="title">{artist.name}</h1>
                            <p className="subtitle">{artist.bio || "No bio available"}</p>
                            <p><a href={artist.website} target="_blank" rel="noopener noreferrer">{artist.website || "No website available"}</a></p>
                        </div>
                    )}
                </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
        </div>
    );
}

DetailArtist.propTypes = {
    id: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired
};

export default DetailArtist;
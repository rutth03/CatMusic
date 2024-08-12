import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import KebabMenu from "../../KebabMenu";
import albumIconDefault from '../../../assets/Avatar.svg';

function AlbumCard({ album }) {
    /* Componente que recibe un objeto album, renderiza su información basica y un boton kebab que maneja las opciones 
       'editar', 'Ver detalles' y 'eliminar' de ese recurso. 
       Al hacer click en el componente se redirecciona a la pagina que contiene las canciones del album. */

    const { id, title, artist: artistID, year, cover } = album;

    const [artistData, setArtistData] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchArtistData = async () => {
            setIsLoading(true);
            setIsError(false);

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/${artistID}`
                );

                if (response.ok) {
                    const result = await response.json();
                    setArtistData(result);
                } else {
                    throw new Error('Error en la solicitud');
                }
            } catch (error) {
                setIsError(true);
                console.error('Error al cargar datos:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArtistData();
    }, [artistID]);

    return (
        <div className="card" onClick={() => navigate(`/albums/${id}`)} style={{
            display: 'flex',
            minWidth: '500px',  
            minHeight: '225px', 
            textAlign: 'center',
            justifyContent: 'center'
        }}>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4">
                            {title}
                        </p>
                    </div>
                </div>
                <div className="card-image">
                            {cover ? (
                                <img src={cover} alt={title} style={{width: '25%', height: '25%', objectFit: 'cover', display: 'block', margin: 'auto'}} />
                            ) : (
                                <img src={albumIconDefault} alt={title} style={{width: '25%', height: '25%', objectFit: 'cover', display: 'block', margin: 'auto'}} />
                            )}
                </div>
                <div className="content">
                    <p className="title is-4"> Artista: {isLoading ? 'Loading...' : (artistData?.name || 'Desconocido')}</p>
                    <p className="title is-4">Año: {year}</p>
                    {isError && <p className="error">Error fetching artist data</p>}
                </div>
            </div>
            <KebabMenu entityType="album" entityId={id}/>
        </div>
    );
}

AlbumCard.propTypes = {
    album: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        artist: PropTypes.number.isRequired,
        year: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        cover: PropTypes.string,
    }).isRequired,
};

export default AlbumCard;
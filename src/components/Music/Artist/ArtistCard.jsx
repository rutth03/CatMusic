/* eslint-disable no-undef */
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import artistIconDefault from '../../../assets/Avatar.svg';
import KebabMenu from "../../KebabMenu";

export default function ArtistCard({ artist }) {
    /* Componente que recibe un objeto artista, renderiza su información basica y un boton kebab que maneja las opciones 
       'editar', 'Ver detalles' y 'eliminar' de ese recurso. 
       Al hacer click en el componente se redirecciona a la pagina que contiene las canciones del artista. */

    const navigate = useNavigate();

    return (
            <div
                className="card"
                onClick={() => navigate(`/artists/${artist.id}`)} >
                    <div className="card-image">
                            {artist.image ? (
                                <img src={artist.image} alt={artist.name} style={{width: '25%', height: '25%', objectFit: 'cover', display: 'block', margin: 'auto'}} />
                            ) : (
                                <img src={artistIconDefault} alt={artist.name} style={{width: '25%', height: '25%', objectFit: 'cover', display: 'block', margin: 'auto'}} />
                            )}
                    </div>
                    <div className="card-content has-text-centered">
                        <p className="title is-5">{artist.name}</p>
                    </div>
                    <KebabMenu entityType="artist" entityId={artist.id}/>
            </div>
    );
}

ArtistCard.propTypes = {
    artist: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string,
    }).isRequired,
};
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import KebabMenu from "../../KebabMenu";

function PlaylistCard({ playlist }) {
    /* Componente que recibe un objeto playlist, renderiza su información basica y un boton kebab que maneja las opciones 
       'editar', 'Ver detalles' y 'eliminar' de ese recurso. 
       Al hacer click en el componente se redirecciona a la pagina que contiene las canciones de la playlist. */

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/playlists/${playlist.id}`);
    };

    return (
        <div 
            className="card"
            onClick={handleCardClick}
            style={{
                display: 'flex',
                minWidth: '500px',  
                minHeight: '225px', 
                textAlign: 'center',
                justifyContent: 'center'
            }}
        >
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4">
                            {playlist.name}
                        </p>
                    </div>
                </div>
                <div className="content">
                    <p className="title is-4">Descripción: {playlist.description}</p>
                    <p className="title is-4">Estado: {playlist.public ? "Pública" : "Privada"}</p>
                </div>
            </div>
            <KebabMenu entityType='playlist' entityId={playlist.id}/>
        </div>
    );
}

PlaylistCard.propTypes = {
    playlist: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        public: PropTypes.bool,
    }).isRequired,
};

export default PlaylistCard;
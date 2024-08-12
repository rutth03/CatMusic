import PropTypes from 'prop-types';
import DetailArtist from '../Music/Artist/DetailArtist';

function DetailsView({ entityType, entityId, onClose }) {
    /* Componente que muestra una ventana modal con los detalles de un recurso de una entidad específica 
       (canción, lista de reproducción, álbum, artista, género). Se realiza una solicitud GET al servidor para obtener 
       una información del recurso y devolverla. */

    switch (entityType) {
        case 'artist':
            return <DetailArtist id={entityId} onClose={onClose} />;
        default:
            return (
                <div onClick={(event) => event.stopPropagation()}>
                    <h2>El componente aún no está disponible.</h2>
                    <button className="button is-info" onClick={onClose} >
                        <span>Aceptar</span>
                    </button>
                </div>
            )
    }
}
DetailsView.propTypes = {
    entityType: PropTypes.oneOf(['song', 'playlist', 'album', 'artist', 'genre']).isRequired,
    entityId: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
  };

export default DetailsView
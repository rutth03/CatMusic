import PropTypes from 'prop-types';
import EditArtist from '../Music/Artist/EditArtist';
import EditGenre from '../Music/Genre/EditGenre';

function EditForm({ entityType, entityId, onClose }) {
    /* Componente que muestra una ventana modal y renderiza dentro, de acuerdo al tipo de entidad, un formulario de edición */

    switch (entityType) {
        case 'artist':
            return <EditArtist id={entityId} onClose={onClose} />;
        case 'genre':
            return <EditGenre id={entityId} onClose={onClose} />;
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

EditForm.propTypes = {
    entityType: PropTypes.oneOf(['artist', 'genre', 'album', 'song', 'playlist']).isRequired,
    entityId: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default EditForm;
import PropTypes from 'prop-types';

function DeleteConfirmation({ entityType, entityId }) {
    return (
        <div>¿Estás seguro que deseas eliminar {entityType} con ID: {entityId}?</div>
    )
}
DeleteConfirmation.propTypes = {
    entityType: PropTypes.oneOf(['song', 'playlist', 'album']).isRequired,
    entityId: PropTypes.number.isRequired,
  };

export default DeleteConfirmation
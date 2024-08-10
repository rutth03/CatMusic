import PropTypes from 'prop-types';

function EditForm({ entityType, entityId }) {
    return (
        <div>Formulario de edición para {entityType} con ID: {entityId}</div>
    )
}

EditForm.propTypes = {
    entityType: PropTypes.oneOf(['song', 'playlist', 'album']).isRequired,
    entityId: PropTypes.number.isRequired,
  };

export default EditForm
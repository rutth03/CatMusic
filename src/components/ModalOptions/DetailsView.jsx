import PropTypes from 'prop-types';

function DetailsView({ entityType, entityId }) {
    return (
        <div>Detalles de {entityType} con ID: {entityId}</div>
    ) 
}
DetailsView.propTypes = {
    entityType: PropTypes.oneOf(['song', 'playlist', 'album']).isRequired,
    entityId: PropTypes.number.isRequired,
  };

export default DetailsView
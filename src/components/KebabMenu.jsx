import { useState } from 'react';
import Modal from './Modal';
import EditForm from './Modal Options/EditForm';
import DetailsView from './Modal Options/DetailsView';
import DeleteConfirmation from './Modal Options/DeleteConfirmation';
import PropTypes from 'prop-types';

function KebabMenu ({ entityType, entityId }) {
  const [isActive, setIsActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const toggleMenu = (event) => {
    event.stopPropagation();
    setIsActive(!isActive);
  };

  const handleEdit = () => {
    setModalContent(<EditForm entityType={entityType} entityId={entityId} />);
    setIsModalOpen(true);
  };

  const handleDetails = () => {
    setModalContent(<DetailsView entityType={entityType} entityId={entityId} />);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    setModalContent(<DeleteConfirmation entityType={entityType} entityId={entityId} />);
    setIsModalOpen(true);
  };


  return (
    <div className={`dropdown is-right ${isActive ? 'is-active' : ''}`} style={{ position: 'absolute', top: '10px', right: '10px' }}>
      <div className="dropdown-trigger">
        <button
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={toggleMenu}
        >
          <span className="icon is-small">
            <i className="fas fa-ellipsis-v"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <button onClick={handleEdit} className="dropdown-item">
            Editar
          </button>
          <button onClick={handleDetails} className="dropdown-item">
            Detalles
          </button>
          <button onClick={handleDelete} className="dropdown-item">
            Eliminar
          </button>
        </div>
      </div>
      <div>
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            {modalContent}
          </Modal>
        )}
      </div>
    </div>
  );
}
KebabMenu.propTypes = {
  entityType: PropTypes.oneOf(['song', 'playlist', 'album']).isRequired,
  entityId: PropTypes.number.isRequired,
};

export default KebabMenu;
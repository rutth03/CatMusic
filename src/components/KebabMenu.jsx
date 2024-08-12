import { useState } from 'react';
import Modal from './Modal';
import EditForm from './ModalOptions/EditForm';
import DetailsView from './ModalOptions/DetailsView';
import DeleteConfirmation from './ModalOptions/DeleteConfirmation';
import PropTypes from 'prop-types';

function KebabMenu ({ entityType, entityId }) {
  /* Componente que muestra un menú desplegable de opciones ('editar', 'ver detalles', 'eliminar') al hacer clic en un botón de 
  "kebab". Cada opción del menú abre un modal con contenido específico y realiza una acción para la entidad seleccionada. */

  const [isActive, setIsActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const toggleMenu = (event) => {
    event.stopPropagation();
    setIsActive(!isActive);
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    setModalContent(<EditForm entityType={entityType} entityId={entityId} onClose={() => setIsModalOpen(false)}/>);
    setIsModalOpen(true);
  };

  const handleDetails = (event) => {
      event.stopPropagation(); 
      setModalContent(<DetailsView entityType={entityType} entityId={entityId} onClose={() => setIsModalOpen(false)}/>);
      setIsModalOpen(true);
  };

  const handleDelete = (event) => {
      event.stopPropagation(); 
      setModalContent(<DeleteConfirmation entityType={entityType} entityId={entityId} onClose={() => setIsModalOpen(false)} />);
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
  entityType: PropTypes.oneOf(['song', 'playlist', 'album', 'artist', 'genre']).isRequired,
  entityId: PropTypes.number.isRequired,
};

export default KebabMenu;
import PropTypes from 'prop-types';

function Modal({ onClose, children }) {
    /* Componente que representa un modal emergente que muestra su contenido en una caja central y se cierra al hacer click
       en el fondo del modal. */

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={onClose}></div>
                <div className="box">
                    <div className="modal-content">
                    {children}
                    </div>
                </div>
        </div>
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired, 
  };

export default Modal
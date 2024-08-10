import PropTypes from 'prop-types';

function Modal({ onClose, children }) {
    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={onClose}></div>
                <div className="box">
                    <div className="modal-content">
                    {children}
                    <button onClick={onClose}>Cerrar</button>
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
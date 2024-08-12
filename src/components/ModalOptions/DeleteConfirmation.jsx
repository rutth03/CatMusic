import PropTypes from 'prop-types';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

function DeleteConfirmation({ entityType, entityId, onClose }) {
    /* Componente que muestra una ventana modal de confirmación para eliminar una entidad específica 
       (canción, lista de reproducción, álbum, artista, género).
       Si el usuario confirma, se realiza una solicitud DELETE al servidor para eliminar la entidad. */

    const { token } = useAuth("state");
    const [error, setError] = useState('');

    const handleDelete = (event) => {
        event.stopPropagation();
        setError('');

        const url = `${import.meta.env.VITE_API_BASE_URL}harmonyhub/${entityType}s/${entityId}`;

        fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${token}`,
            }
        })
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 403) {
                        setError("No tienes los permisos para eliminar este recurso");
                    } else {
                        throw new Error(`No se pudo eliminar el ${entityType}`);
                    }
                } else {
                    alert("El recurso se ha eliminado exitosamente")
                    onClose();
                }
            })
            .catch((error) => {
                setError(error.message);
                console.error(`Error al eliminar el ${entityType}`, error);
            });
    };

    return (
        <div className="modal-content" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px'}}>
            <p style={{marginBottom: '15px'}}>¿Estás seguro que deseas eliminar?</p>

            <div className="modal-buttons" style={{display: 'flex', gap: '10px' }}>
            <button className="button is-danger is-outlined"
                onClick={(event) => { event.stopPropagation(); handleDelete(event) }}>
                <span>Eliminar</span>
                <span className="icon is-small">
                    <i className="fas fa-times"></i>
                </span>
            </button>
            <button className="button is-primary is-outlined"  onClick={(event) => {
                event.stopPropagation(); onClose()}}>
                <span>Cancelar</span>
            </button>
            </div>
            {error && <p className="error-message" style={{color: 'red', marginTop: '10px'}}>{error}</p>}
        </div>
    );
}

DeleteConfirmation.propTypes = {
    entityType: PropTypes.oneOf(['song', 'playlist', 'album', 'artist', 'genre']).isRequired,
    entityId: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default DeleteConfirmation;
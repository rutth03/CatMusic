import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import KebabMenu from "../../KebabMenu";

function GenreCard({ genre }) {
    /* Componente que recibe un objeto genero, renderiza su información basica y un boton kebab que maneja las opciones 
       'editar', 'Ver detalles' y 'eliminar' de ese recurso. 
       Al hacer click en el componente se redirecciona a la pagina que contiene las canciones del genero. */

    const navigate = useNavigate();
    return (
        
        <div className="card" onClick={() => navigate(`/genres/${genre.id}`)}>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4">
                            {genre.name}
                        </p>
                    </div>
                </div>
            </div>
            <KebabMenu entityType='genre' entityId={genre.id} />
        </div>
    );
}
GenreCard.propTypes = {
    genre: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};

export default GenreCard;
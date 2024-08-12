import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function NavMenu({ items }) {
    /* Componente que representa un menú de navegación dentro de la barra de navegación (navbar).
       Genera un conjunto de enlaces de navegación a partir de una lista de elementos proporcionada como prop. */
       
    return (
        <div className="navbar-menu">
            <div className="navbar-start">
                {items.map((item, index) => (
                    <Link
                        key={index}
                        className="navbar-item"
                        to={item.url}
                    >
                        {item.text}
                    </Link>
                ))}
            </div>
        </div>
    );
}
NavMenu.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default NavMenu;

import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function NavMenu({ items }) {

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

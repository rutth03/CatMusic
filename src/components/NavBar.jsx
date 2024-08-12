import logo from "../assets/CatMusicLogo.svg"
import '../assets/LogoStyles.css';
import NavMenu from "./NavMenu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth} from "../context/AuthContext";
import PropTypes from 'prop-types';

function NavBar({ appName }) {
    /* componente representa la barra de navegación principal de la aplicación. 
       Contiene el logo de la aplicación, enlaces a diferentes secciones, y un botón para cerrar sesión. */

    const { logout } = useAuth("actions");
    const navigate = useNavigate();

    return (
        <header>
            <nav
                className="navbar"
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <div className="columns is-vcentered">
                        <Link className="navbar-item column" to="/">
                            <figure className="image custom-logo">
                                <img 
                                src={logo}
                                alt="App Logo"
                                className="custom-logo-img"
                                />
                            </figure>
                            <p className="column"><strong>{appName}</strong></p>
                            </Link>
                    </div>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <Link className="navbar-item" to="/profile">
                            <span className="icon">
                                <i className="fas fa-user"></i>
                            </span>
                            <span>Mi perfil</span>
                        </Link> 
                    </div>
                    <div className="navbar-end"></div>
                </div>
                <NavMenu
                    items={[
                        { text: "Mis canciones", url: "/songs" },
                        { text: "Playlists", url: "/playlists" },
                        { text: "Artistas", url: "/artists" },
                        { text: "Albumes", url: "/albums" },
                        { text: "Generos", url: "/genres" },
                    ]}
                />
                <div className="navbar-start">
                    <button className="button" onClick={() => logout(navigate)}>
                        <span className="icon">
                            <i className="fas fa-sign-out-alt"></i>
                        </span>
                        <span>Log Out</span>
                    </button>
                </div>
                <div className="navbar-end"></div>
            </nav>
        </header>
    );
}
NavBar.propTypes = {
    appName: PropTypes.string.isRequired,
};

export default NavBar;

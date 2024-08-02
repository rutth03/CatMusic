import logo from "../assets/headphones.svg"
import NavMenu from "./NavMenu";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function NavBar({ appName }) {

    return (
        <header>
            <nav
                className="navbar"
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <div className="columns is-centered">
                        <Link className="navbar-item column" to="/">
                            <img
                                src={logo}
                                alt="App Logo"
                                className="image is-64x64"
                            />
                        </Link>
                        <p className="column"><strong>{appName}</strong></p>
                    </div>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <Link className="navbar-item" to="/profile">
                            Mi perfil
                        </Link> 
                    </div>
                    <div className="navbar-end"></div>
                </div>
                <NavMenu
                    items={[
                        { text: "Mis canciones", url: "/inicio/songs" },
                        { text: "Playlists", url: "/playlists" },
                        { text: "Artistas", url: "/artists" },
                        { text: "Albumes", url: "/albums" },
                        { text: "Generos", url: "/genres" },
                    ]}
                />
            </nav>
        </header>
    );
}
NavBar.propTypes = {
    appName: PropTypes.string.isRequired,
};

export default NavBar;

import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Layout() {
    /* Componente que envuelve las rutas de la aplicación y proporciona una estructura básica.
       Actúa como un contenedor para las rutas y contiene una barra de navegación comun en todas las páginas y el contenido
       renderizado por el enrutador. */

    return (
            <div className={`hero is-fullheight is-flex is-flex-direction-column`}>
            <NavBar appName={"Cat Music"} />
                <div className={`container`}>
                    <Outlet />
                </div>
            </div>
    );
}

import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Layout() {

    return (
            <div className={`hero is-fullheight is-flex is-flex-direction-column`}>
            <NavBar appName={"Harmony Hub"} />
                <div className={`container`}>
                    <Outlet />
                </div>
            </div>
    );
}

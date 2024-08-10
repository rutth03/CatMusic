import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";

export default function Layout() {

    return (
            <div className={`hero is-fullheight is-flex is-flex-direction-column`}>
            <NavBar appName={"Cat Music"} />
                <div className={`container`}>
                    <SearchBar>
                        <Outlet />
                    </SearchBar>
                </div>
            </div>
    );
}

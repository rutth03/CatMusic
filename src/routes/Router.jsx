import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../components/Auth/Login";
import SongList from "../components/Music/SongList";

const Router = createBrowserRouter([
    {   
        path: "/",
        element: <Login />,
    },
    {
        path: "/inicio",
        element: <Layout />,
        children: [
            {
                path: "songs",
                element:(
                    <ProtectedRoute>
                        <SongList />
                    </ProtectedRoute>
                )       
            },
        ],
    }
]);

export default Router;
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../components/Auth/Login";
import SongList from "../components/Music/Song/SongList";
import AlbumList from "../components/Music/Album/AlbumList";
import AlbumSongs from "../components/Music/Album/AlbumSongs";
import GenreList from "../components/Music/Genre/GenreList";
import GenreSongs from "../components/Music/Genre/GenreSongs";
import ArtistList from "../components/Music/Artist/ArtistList";
import ArtistSongs from "../components/Music/Artist/ArtistSongs";
import Playlist from "../components/Music/Playlist/Playlist";
import PlaylistSongs from "../components/Music/Playlist/PlaylistSongs";

const Router = createBrowserRouter([
    {   
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <SongList />     
            },
            {
                path: "songs",
                element: <SongList />     
            },
            {
                path: "albums",
                children: [
                    {
                        index: true,
                        element: <AlbumList /> 
                    },{
                        path: ":id",
                        element: <AlbumSongs />
                    }
                ]    
            },
            {
                path: "genres",
                children: [
                    {
                        index: true,
                        element: <GenreList /> 
                    },{
                        path: ":id",
                        element: <GenreSongs />
                    }
                ]    
            },
            {
                path: "artists",
                children: [
                    {
                        index: true,
                        element: <ArtistList /> 
                    },
                    {
                        path: ":id",
                        element: <ArtistSongs /> 
                    }
                ]    
            },
            {
                path: "playlists",
                children: [
                    {
                        index: true,
                        element: <Playlist /> 
                    },
                    {
                        path: ":id",
                        element: <PlaylistSongs /> 
                    }
                ]    
            },
        ],
    }
]);

export default Router;
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
import NotFound from "../components/NotFound";
import NewSong from "../components/Music/Song/NewSong";
import NewGenre from "../components/Music/Genre/NewGenre";
import NewAlbum from "../components/Music/Album/NewAlbum";
import NewArtist from "../components/Music/Artist/NewArtist";
import NewPlaylist from "../components/Music/Playlist/NewPlaylist";
import Profile from "../components/Profile";

/* Se configuran todas las rutas de la aplicación y las protege cuando es necesario. */

const Router = createBrowserRouter([
    /* Se crea el enrutador y se definen las rutas y sus respectivos componentes.*/
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
                children: [
                    {
                        index: true,
                        element: <SongList /> 
                    },{
                        path: "new",
                        element: <NewSong />
                    }
                ]    
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
                    },{
                        path: "new",
                        element: <NewAlbum />
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
                    },{
                        path: "new",
                        element: <NewGenre />
                    }
                ]    
            },
            {
                path: "artists",
                children: [
                    {
                        index: true,
                        element: <ArtistList /> 
                    },{
                        path: ":id",
                        element: <ArtistSongs /> 
                    },{
                        path: "new",
                        element: <NewArtist />
                    }
                ]    
            },
            {
                path: "playlists",
                children: [
                    {
                        index: true,
                        element: <Playlist /> 
                    },{
                        path: ":id",
                        element: <PlaylistSongs /> 
                    },{
                        path: "new",
                        element: <NewPlaylist /> 
                    }
                ]    
            },{
                path: "profile",
                element: <Profile />  
            },
        ],
    },
    {
        path: "*",
        element: <NotFound/>
    }
]);

export default Router;
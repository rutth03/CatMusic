/* eslint-disable react-hooks/exhaustive-deps */
import useFetch from "../../../hooks/useFetch";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import KebabMenu from "../../KebabMenu";

function AlbumCard({ album }) {
    const { id, title, artist: artistID, year } = album;

    const [{ data, isError, isLoading }, doFetch] = useFetch(
        `https://sandbox.academiadevelopers.com/harmonyhub/artists/${artistID}`,
        {}
    );

    useEffect(() => {
        doFetch();
    }, [artistID]);

    const navigate = useNavigate();

    return (
        <div className="card" onClick={() => navigate(`/home/albums/${id}`)} style={{ position: 'relative'}}>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4">
                            {title}
                        </p>
                    </div>
                </div>
                <div className="content">
                    <p className="title is-4">Artista: {isLoading ? 'Loading...' : data.name}</p>
                    <p className="title is-4">Año: {year}</p>
                    {isError && <p className="error">Error fetching artist data</p>}
                </div>
            </div>
            <KebabMenu/>
        </div>
    );
}

AlbumCard.propTypes = {
    album: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        artist: PropTypes.number.isRequired,
        year: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
    }).isRequired,
};

export default AlbumCard;
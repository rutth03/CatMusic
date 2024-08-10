/* eslint-disable no-undef */
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import artistIconDefault from '../../../assets/Avatar.svg';
import KebabMenu from "../../KebabMenu";

export default function ArtistCard({ artist }) {
    const navigate = useNavigate();

    return (
            <div
                className="card"
                onClick={() => navigate(`/home/artists/${artist.id}`)} style={{ position: 'relative'}}>
                    <div className="card-image">
                            {artist.image ? (
                                <img src={artist.image} alt={artist.name} style={{width: '25%', height: '25%', objectFit: 'cover', display: 'block', margin: 'auto'}} />
                            ) : (
                                <img src={artistIconDefault} alt={artist.name} style={{width: '25%', height: '25%', objectFit: 'cover', display: 'block', margin: 'auto'}} />
                            )}
                    </div>
                    <div className="card-content has-text-centered">
                        <p className="title is-5">{artist.name}</p>
                    </div>
                    <KebabMenu/>
            </div>
    );
}

ArtistCard.propTypes = {
    artist: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string,
    }).isRequired,
};
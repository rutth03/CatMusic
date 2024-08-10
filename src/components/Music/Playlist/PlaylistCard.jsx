import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import KebabMenu from "../../KebabMenu";

function PlaylistCard({ playlist }) {
    const navigate = useNavigate();
    return (
        
        <div className="card" onClick={() => navigate(`/home/playlists/${playlist.id}`)} style={{ position: 'relative'}}>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4">
                            {playlist.name}
                        </p>
                    </div>
                </div>
                <div className="content">
                    <p className="title is-4">Descripción: {playlist.description}</p>
                    <p className="title is-4">Estado: {playlist.public ? "Pública" : "Privada"}</p>
                </div>
            </div>
            <KebabMenu/>
        </div>
    );
}

PlaylistCard.propTypes = {
    playlist: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        public: PropTypes.bool,
    }).isRequired,
};

export default PlaylistCard;
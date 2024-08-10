import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function GenreCard({ genre }) {
    const navigate = useNavigate();
    return (
        
        <div className="card" onClick={() => navigate(`/home/genres/${genre.id}`)}>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4">
                            {genre.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
GenreCard.propTypes = {
    genre: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};

export default GenreCard;
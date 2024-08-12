import PropTypes from "prop-types";
import KebabMenu from "../../KebabMenu";

function MySongs({ song }) {
    /* Componente que recibe un objeto canción, renderiza su información basica y un boton kebab que maneja las opciones 
       'editar','Ver detalles' y 'eliminar' de ese recurso. */

    return (
        <div className="card" style={{ position: 'relative'}}>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4">
                            {song.title}
                        </p>
                    </div>
                </div>
                <div className="content">
                    {song.song_file ? (
                        <audio controls>
                            <source src={song.song_file} type="audio/mpeg" />
                            Tu navegador no soporta el elemento de audio.
                        </audio>
                    ) : (
                        <p>Archivo de canción no disponible</p>
                    )}
                </div>
            </div>
            <KebabMenu entityType='song' entityId={song.id} />
        </div>
    );
}
MySongs.propTypes = {
    song: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        song_file: PropTypes.string,
    }).isRequired,
};

export default MySongs;
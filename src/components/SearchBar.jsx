import PropTypes from 'prop-types';

const SearchBar = ({ children }) => {
    return (
        <div className="my-5">
            <div className="field has-addons">
                <div className="control is-expanded">
                    <input className="input" type="text" placeholder="Buscar..." />
                </div>
                <div className="control">
                    <button className="button is-info">
                        <span className="icon">
                            <i className="fas fa-search"></i>
                        </span>
                    </button>
                </div>
            </div>
            {children && <div className="mt-4">{children}</div>}
        </div>
    );

};

SearchBar.propTypes = {
    children: PropTypes.node,
};

export default SearchBar;
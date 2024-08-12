import { Link } from 'react-router-dom';

const NotFound = () => {
  /* Componente que se se renderiza cuando el usuario intenta acceder a una ruta que no existe en la aplicación.
     Muestra un mensaje de error 404 y proporciona un enlace para redirigir al usuario de vuelta a la página principal ('/').*/

  return (
    <div className="not-found-container" style={{textAlign: 'center', padding: '50px'}}>
      <h1 className="not-found-title" style={{fontSize: '100px', margin: '0'}}>404</h1>
      <p className="not-found-message" style={{fontSize: '24px', margin: '20px 0'}}>Oops! The page you are looking for does not exist.</p>
        <Link to="/" className="not-found-link" style={{fontSize: '18px', color: '#007bff'}}>
        Go back to Home
        </Link>
    </div>
  );
};

export default NotFound;
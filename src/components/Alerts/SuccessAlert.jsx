/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessAlert = ({ message, redirectTo }) => {
  /* Componente que lanza una alerta con un mensaje pasado por parametros y redirige a otra pagina indicada */
  const navigate = useNavigate();

  useEffect(() => {
    alert(message);
    navigate(redirectTo);
  }, [message, navigate, redirectTo]);

  return null;
};

export default SuccessAlert;
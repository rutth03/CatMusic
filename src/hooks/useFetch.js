import { useState, useEffect } from 'react';

function useFetch(url, page, pageSize = 10) {
    /* Hook personalizado que realiza solicitudes fetch con manejo de paginación.
       Realiza una solicitud a una URL específica con parámetros de página y tamaño de página, y maneja la adición de nuevos
       resultados a los datos existentes, así como el estado de carga y errores. */

    const [data, setData] = useState([]);
    const [nextUrl, setNextUrl] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setIsError(false);

            try {
                const response = await fetch(`${url}?page=${page}&page_size=${pageSize}`);

                if (response.ok) {
                    const result = await response.json();
                    if (result.results) {
                        setData((prevData) => {
                            const newData = result.results.filter(item => !prevData.some(prevItem => prevItem.id === item.id));
                            return [...prevData, ...newData];
                        });
                        setNextUrl(result.next);
                    }
                } else if (response.status === 404) {
                    setNextUrl(null);
                } else {
                    throw new Error('Error desconocido');
                }
            } catch (error) {
                setIsError(true);
                console.error('Error al cargar datos:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url, page, pageSize]);

    return { data, nextUrl, isError, isLoading };
}

export default useFetch;
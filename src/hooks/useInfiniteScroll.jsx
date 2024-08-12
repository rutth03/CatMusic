/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

function useInfiniteScroll(callback, dependencies) {
    /* Hook personalizado que usa `IntersectionObserver` para detectar cuando un elemento está visible en el viewport y 
       ejecuta una función de callback cuando esto ocurre. Utilizado para cargar más datos cuando el usuario se acerca al 
       final de una lista. */

    const observerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                callback();
            }
        });

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, dependencies);

    return observerRef;
}

export default useInfiniteScroll;
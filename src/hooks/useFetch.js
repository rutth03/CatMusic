/* eslint-disable no-unused-vars */
import { useReducer } from "react";

const ACTIONS = {
    FETCH_INIT: "FETCH_INIT",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_FAILURE: "FETCH_FAILURE",
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.FETCH_INIT:
            return {
                isError: false,
                isLoading: true,
            };
        case ACTIONS.FETCH_SUCCESS:
            return {
                data: action.payload,
                isError: false,
                isLoading: false,
            };
        case ACTIONS.FETCH_FAILURE:
            return {
                isError: true,
                isLoading: false,
            };
        default:
            return state;
    }
}

function useFetch(url, options = {}) {
    const [state, dispatch] = useReducer(reducer, {
        isError: false,
        isLoading: true,
        data: null,
    });

    /*function doFetch(newOptions) {
        dispatch({ type: ACTIONS.FETCH_INIT });

        fetch(url, { ...options, ...newOptions })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw Error("Error al relizar la petición");
            })
            .then((data) => {
                dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data });
            })
            .catch((e) => {
                dispatch({ type: ACTIONS.FETCH_FAILURE });
            });
    }*/
    
            const doFetch = async (newOptions = {}) => {
                dispatch({ type: ACTIONS.FETCH_INIT });
        
                try {
                    const response = await fetch(url, { ...options, ...newOptions })
                    if(!response.ok) throw new Error("Error al relizar la petición");
                    const data = await response.json();
                    dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data });
                    return data;
                } catch(e){
                    dispatch({ type: ACTIONS.FETCH_FAILURE });
                    throw e;
                }}


    return [state, doFetch];
}

export default useFetch;
import axios from "axios";

const API_URL = "https://swapi.dev/api/";

const getEndpointData = async (endpoint, page = 1, pageSize = 10) => {
    try {
        const { data } = await axios.get(`${API_URL}${endpoint}/?page=${page}&limit=${pageSize}`);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const getFilms = async (page, pageSize) => {
    return getEndpointData("films", page, pageSize);
};

export const getPeople = async (page, pageSize) => {
    return getEndpointData("people", page, pageSize);
};

export const getPlanets = async (page, pageSize) => {
    return getEndpointData("planets", page, pageSize);
};

export const getSpecies = async (page, pageSize) => {
    return getEndpointData("species", page, pageSize);
};

export const getStarships = async (page, pageSize) => {
    return getEndpointData("starships", page, pageSize);
};

export const getVehicles = async (page, pageSize) => {
    return getEndpointData("vehicles", page, pageSize);
};

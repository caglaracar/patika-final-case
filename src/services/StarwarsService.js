// Import required dependencies
import axios from "axios";

// Define the base API URL
const API_URL = "https://swapi.dev/api/";

// Define a function to fetch data from a given API endpoint
const getEndpointData = async (endpoint, page = 1, pageSize = 10) => {
    try {
        // Make a GET request to the API endpoint with specified page and page size
        const { data } = await axios.get(`${API_URL}${endpoint}/?page=${page}&limit=${pageSize}`);
        // Return the fetched data
        return data;
    } catch (error) {
        // Log any errors that occur during the request
        console.error(error);
    }
};

// Define a function to fetch film data
export const getFilms = async (page, pageSize) => {
    return getEndpointData("films", page, pageSize);
};

// Define a function to fetch people data
export const getPeople = async (page, pageSize) => {
    return getEndpointData("people", page, pageSize);
};

// Define a function to fetch planet data
export const getPlanets = async (page, pageSize) => {
    return getEndpointData("planets", page, pageSize);
};

// Define a function to fetch species data
export const getSpecies = async (page, pageSize) => {
    return getEndpointData("species", page, pageSize);
};

// Define a function to fetch starship data
export const getStarships = async (page, pageSize) => {
    return getEndpointData("starships", page, pageSize);
};

// Define a function to fetch vehicle data
export const getVehicles = async (page, pageSize) => {
    return getEndpointData("vehicles", page, pageSize);
};

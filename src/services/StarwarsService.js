import axios from "axios";

const API_URL = "https://swapi.dev/api/";

export const getFilms = async () => {
    try {
        const { data } = await axios.get(`${API_URL}films/`);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const getPeople = async () => {
    try {
        const { data } = await axios.get(`${API_URL}people/`);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const getPlanets = async () => {
    try {
        const { data } = await axios.get(`${API_URL}planets/`);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const getSpecies = async () => {
    try {
        const { data } = await axios.get(`${API_URL}species/`);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const getStarships = async () => {
    try {
        const { data } = await axios.get(`${API_URL}starships/`);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const getVehicles = async () => {
    try {
        const { data } = await axios.get(`${API_URL}vehicles/`);
        return data;
    } catch (error) {
        console.error(error);
    }
};

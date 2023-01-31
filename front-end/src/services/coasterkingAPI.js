import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;

function createUpdateUser (userObj){
    const promise = axios.post(`${baseURL}/users`, userObj);
    return promise;
}

async function getUserByToken(config) {
    const promise = axios.get(`${baseURL}/users`, config);
    return promise;
}

async function getCoasters(config) {
    const promise = axios.get(`${baseURL}/coasters`, config);
    return promise;
}

async function getMyCoastersCount(config) {
    const promise = axios.get(`${baseURL}/riders/me`, config);
    return promise;
}

export const coasterKingAPI = { createUpdateUser, getUserByToken, getCoasters, getMyCoastersCount }

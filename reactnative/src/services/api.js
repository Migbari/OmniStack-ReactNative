import axios from 'axios';

// Efetuando busca API backend
const api = axios.create({
    baseURL: 'http://192.168.15.15:3333',
});

export default api;
import axios from 'axios';
const BASE_URL = 'http://localhost:3000';
// const BASE_URL = 'http://192.168.1.21:3000';


export default axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type':'application/json'}
});

//Added interceptors for jwt refresh
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type':'application/json' }
});
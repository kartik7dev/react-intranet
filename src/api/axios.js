import axios from "axios";
const BASE_URL = 'http://192.168.17.30:3500';

export default axios.create({
    baseURL : BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL : BASE_URL,
    withCredentials : true,
}) 
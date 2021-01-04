const APIURL = "http://localhost:3000/api";
const axios = require("axios");

axios.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");
    config.headers.Authorization = 'Bearer: '+ token;
    return config;
}, (error) => {
    return Promise.reject(error);
});

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // if (error.response.status == 401) {
        //      sessionStorage.clear();
        // }
        return error;
    }
);
export const requestsMixin = {
    methods: {
        URL(){
            return APIURL;
        },
        signUp(data) {
             return axios.post(`${APIURL}/users`, data);
        },
        logIn(data) {
            return axios.post(`${APIURL}/users/login`, data);
        },
        atividadesInsert(data) {
            return axios.post(`${APIURL}/atividades`, data);
        },
        atividadesUpdate(id, data) {
            return axios.put(`${APIURL}/atividades/${id}`, data);
        },
        atividades(limit, page) {
            return axios.get(`${APIURL}/atividades?limit=${limit || 5}&offset=${page || 0}`);
        },
        clientes(limit, page) {
            return axios.get(`${APIURL}/clientes?limit=${limit || 5}&offset=${page || 0}`);
        },
        clientesInsert(data) {
            return axios.post(`${APIURL}/clientes`, data);
        }
    }
};
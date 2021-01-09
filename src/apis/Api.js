import axios from 'axios';

let BaseApi = axios.create({
    // baseURL: 'http://localhost:8000/api'
    baseURL: "https://api.unionpowerpac.com.mm/api"
});



let Api = function() {
    let token = localStorage.getItem("token");

    if (token) {
        BaseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return BaseApi;
};


export const wait = t => new Promise(resolve => setTimeout(resolve, t));


export default Api;
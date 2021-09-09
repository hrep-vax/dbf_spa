const axios = require("axios");

export function httpRequest(method, url, data, token) {
    return axios({
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: method,
        url: process.env.VUE_APP_API_URL + url,
        data: data,
    });
}

export function httpRequestUploadFile(method, url, data, token) {
    return axios({
        headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        method: method,
        url: process.env.VUE_APP_API_URL + url,
        data: data,
    });
}

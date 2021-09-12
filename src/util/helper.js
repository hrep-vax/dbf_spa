const axios = require('axios')

export function httpRequest(
    method,
    url,
    data,
    token,
    content_type = 'application/json',
    responseType = 'json'
) {
    return axios({
        headers: {
            "Content-Type": content_type,
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        method: method,
        url: process.env.VUE_APP_API_URL + url,
        data: data,
        responseType: responseType
    })
}

export function createURLFromBlob(blob) {
    return window.URL.createObjectURL(blob)
}

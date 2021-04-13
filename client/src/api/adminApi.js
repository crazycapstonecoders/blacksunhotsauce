import axios from 'axios'

const server = 'http://localhost:5000'

export const createProduct = (product, userId, token) => {
    return axios({
        method: 'POST',
        url: `${server}/api/product/create/${userId}`,
        headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`
        },
        // we are sending form data, NOT json object
        data: product
    })
}

export const getSingleProduct = productId => {
    return axios({
        method: 'GET',
        url: `${server}/api/product/${productId}`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json"
        },
    })
}

export const removeProduct = (productId, userId, token) => {
    return axios({
        method: 'DELETE',
        url: `${server}/api/product/remove/${productId}/${userId}`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateProduct = (productId, product, userId, token) => {
    return axios({
        method: 'PUT',
        url: `${server}/api/product/update/${productId}/${userId}`,
        headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`
        },
        // we are sending form data, NOT json object
        data: product
    })
}

export const getOrders = (userId, token) => {
    return axios({
        method: 'GET',
        url: `${server}/api/order/${userId}/list`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}

export const getStatusValues = (userId, token) => {
    return axios({
        method: 'GET',
        url: `${server}/api/order/${userId}/status-values`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateOrderStatus = (userId, token, orderId, status) => {
    return axios({
        method: 'PUT',
        url: `${server}/api/order/${userId}/${orderId}/status`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        data: JSON.stringify({ orderId, status })
    })
}
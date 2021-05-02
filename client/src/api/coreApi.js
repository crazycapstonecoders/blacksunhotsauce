import axios from 'axios'

/**
This file exports different functions that make requests/calls to the API/Backend.
API calls/requests are made via axios.
 */

export const getBraintreeToken = (userId, token) => {
    return axios({
        method: 'GET',
        url: `/api/braintree/getToken/${userId}`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}

export const processPayment = (userId, token, paymentData) => {
    return axios({
        method: 'POST',
        url: `/api/braintree/payment/${userId}`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        data: JSON.stringify(paymentData)
    })
}

export const createOrder = (userId, token, orderData) => {
    return axios({
        method: 'POST',
        url: `/api/order/create/${userId}`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        data: JSON.stringify({ order: orderData })
    })
}

export const getProducts = () => {
    return axios({
        method: 'GET',
        url: `/api/product/products`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json"
        }
    })
}

export const mailToAdmin = message => {
    return axios({
        method: 'POST',
        url: `http://localhost:5000/api/user/mail-to-admin`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
        },
        data: JSON.stringify(message)
    })
}
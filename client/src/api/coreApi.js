import axios from 'axios'

const server = 'http://localhost:5000'

/**
This file exports different functions that make requests/calls to the API/Backend.
API calls/requests are made via axios.
 */

export const getBraintreeToken = (userId, token) => {
    return axios({
        method: 'GET',
        url: `${server}/api/braintree/getToken/${userId}`,
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
        url: `${server}/api/braintree/payment/${userId}`,
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
        url: `${server}/api/order/create/${userId}`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        data: JSON.stringify({ order: orderData })
    })
}
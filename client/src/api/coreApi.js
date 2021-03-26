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
import axios from 'axios'

const server = 'http://localhost:5000'

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
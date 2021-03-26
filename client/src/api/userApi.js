import axios from 'axios'

const server = process.env.REACT_APP_SERVER

/**
This folder exports different functions that make requests/calls to the API/Backend.
API calls/requests are made via axios.
 */

export const read = (userId, token) => {
    return axios({
        method: 'GET',
        url: `${server}/api/user/${userId}`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
}

export const update = (userId, token, user) => {
    return axios({
        method: 'PUT',
        url: `${server}/api/user/update/${userId}`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        data: JSON.stringify(user)
    })
}

// to see immediate changes after updating
// we use this function
export const updatedUser = (user, next) => {
    if(typeof window !== undefined) {
        if(localStorage.getItem('jwt')) {
            let auth = JSON.parse(localStorage.getItem('jwt'))
            auth.user = user
            localStorage.setItem('jwt', JSON.stringify(auth))
            next()
        }
    }
}
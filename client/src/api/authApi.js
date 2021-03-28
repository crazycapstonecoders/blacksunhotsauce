import axios from 'axios'

const server = 'http://localhost:5000'

/**
This file exports different functions that make requests/calls to the API/Backend.
API calls/requests are made via axios.
 */

export const signup = user => {
    return axios({
        method: 'POST',
        url: `${server}/api/auth/signup`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
        },
        data: JSON.stringify(user)
    })
}

export const signin = user => {
    return axios({
        method: 'POST',
        url: `${server}/api/auth/signin`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
        },
        data: JSON.stringify(user)
    })
}

export const signout = next => {
    // remove jwt and user object when user signs out
    if(typeof window !== 'undefined') {
        localStorage.removeItem('jwt')
        localStorage.removeItem('user')
        next()
        return axios.get(`${server}/api/auth/signout`)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    }
}

export const authenticate = (res, next) => {
    // set jwt and user object in localStorage to retrieve easily
    if(typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(res.data))
        next()
    }
}

// check if user is authenticated by parsing jwt from localStorage
export const isAuthenticated = () => {
    if(typeof window === 'undefined') {
        return false
    }
    if(localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    } else {
        return false
    }
}

export const forgotPassword = email => {
    return axios({
        method: 'PUT',
        url: `${server}/api/auth/forgot-password`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
        },
        data: JSON.stringify({ email })
    })
}

export const resetPassword = resetInfo => {
    return axios({
        method: 'PUT',
        url: `${server}/api/auth/reset-password`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
        },
        data: JSON.stringify(resetInfo)
    })
}

export const validateRecaptcha = token => {
    return axios({
        method: 'POST',
        url:`${server}/api/auth/validateRecaptcha`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json"
        },
        data: JSON.stringify({ token })
    })
}

export const socialLogin = user => {
    return axios({
        method: 'POST',
        url:`${server}/api/auth/social-login`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json"
        },
        data: JSON.stringify(user)
    })
}

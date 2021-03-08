import axios from 'axios'

let server = 'http://localhost:5000'

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
    if(typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(res.data.token))
        localStorage.setItem('user', JSON.stringify(res.data.user))
        next()
    }
}

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

export const validateRecaptcha = token => {
    return axios({
        method: 'post',
        url:`${server}/api/auth/validateRecaptcha`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json"
        },
        data: JSON.stringify({ token })
    })
}

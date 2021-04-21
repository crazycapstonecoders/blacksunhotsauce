const axios = require('axios')

const server = 'https://blacksunhotsauce.herokuapp.com'

exports.getProducts = () => {
    return axios({
        method: 'GET',
        url: `${server}/api/product/products`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json"
        }
    })
}

exports.listProductByName = name => {
    return axios({
        method: 'GET',
        url: `http://localhost:5000/api/product/by/productName`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json"
        },
        data: JSON.stringify({ name })
    })
}
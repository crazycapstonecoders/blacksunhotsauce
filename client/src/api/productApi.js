const Product = require('../models/product')

const server = 'http://localhost:5000'

export const getProducts = () => {
    //Formulate and return the request

//TODO This needs to be worked out

    return products({
        method: 'GET',
        url: `${server}`,
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json"

        }
    })
}
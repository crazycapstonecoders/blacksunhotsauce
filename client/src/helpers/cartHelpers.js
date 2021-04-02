/**
This file exports different helper functions that
assists in cart operations.
 */

export const addItem = (item, next) => {
    let cart = []
    if(typeof window !== 'undefined') {
        if(localStorage.getItem('cart')) {
            // populate cart array with info from localStorage
            // JSON.parse converts json to object
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...item,
            count: 1
        })

        // map through original cart and get only the id
        // pass it into Set
        // Set automatically remove duplicates
        // this prevents error when user click on same product twice
        // since we want to increment the product NOT have two similar products
        // Array.from derives a shallow copy of the array from the set
        let removeDuplicates = Array.from(new Set(cart.map(product => product._id)))

        // map through that array
        cart = removeDuplicates.map(id => {
            // return the actual product based on the id
            return cart.find(product => product._id === id)
        })
        //JSON.stringigy converts objects to json
        localStorage.setItem('cart', JSON.stringify(cart))
        next()
    }
}

export const itemTotal = () => {
    if(typeof window !== undefined) {
        if(localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length
        }
    }
    return 0
}

export const getCart = () => {
    if(typeof window !== undefined) {
        if(localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'))
        }
    }
    return []
}

export const updateItem = (productId, count) => {
    let cart = []
    if(typeof window !== undefined) {
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.map((product, i) => {
            if(product._id === productId) {
                cart[i].count = count
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart))
    }
}

export const removeItem = productId => {
    let cart = []
    if(typeof window !== undefined) {
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.map((product, i) => {
            // remove the product we want using splice method
            if(product._id === productId) {
                cart.splice(i, 1)
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    return cart
}

export const emptyCart = next => {
    if(typeof window !== undefined) {
        localStorage.removeItem('cart')
        next()
    }
}
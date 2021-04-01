import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getBraintreeToken } from '../../../api/coreApi'
import { isAuthenticated } from '../../../api/authApi'
import DropIn from 'braintree-web-drop-in-react' 
// core components
import Button from "components/CustomButtons/Button.js"
import { getConstantValue } from 'typescript'

export default function Checkout({ products }) {
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    })
    // get authenticated user id and auth token while making sure user is indeed authenticated first
    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    const getToken = (userId, token) => {
        getBraintreeToken(userId, token).then(res => {
            setData({ ...data, clientToken: res.data.clientToken, success: res.data.success })
        }).catch(error => {
            console.log(error)
            setData({ ...data, error: error.response.data.error })
        })
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])

    const showDropIn = () => (
        <div>
            <h2>Your cart summary</h2>
            <hr />
            <h2>Total: ${getTotal()}</h2>
            {data.clientToken !== null ? (
            <div>
                <DropIn 
                options={{ authorization: data.clientToken, paypal: { vault: 'flow' } }} 
                onInstance={instance => data.instance = instance} 
                />
                <Button round color="success">
                    Checkout
                </Button>
            </div>
            ) : null}
        </div>
    )

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Button color="info" to='/signin' component={Link}>
                Sign in to checkout
            </Button>
        )
    }

    return (
        <div>
            {showCheckout()}
        </div>
    )
}

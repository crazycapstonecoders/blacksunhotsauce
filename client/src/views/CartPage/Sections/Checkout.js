import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getBraintreeToken, processPayment, createOrder } from '../../../api/coreApi'
import { isAuthenticated } from '../../../api/authApi'
import { emptyCart } from '../../../helpers/cartHelpers'
import DropIn from 'braintree-web-drop-in-react' 
// @material-ui/icons
import Check from "@material-ui/icons/Check";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from '@material-ui/core'
// core components
import Button from "components/CustomButtons/Button.js"
import CustomInput from "components/CustomInput/CustomInput.js"
import SnackbarContent from "components/Snackbar/SnackbarContent.js"

const styles = {
    textArea: {
        marginRight: "15px",
        marginLeft: "15px"
    }
}

const useStyles = makeStyles(styles);

export default function Checkout({ products, setRun = f => f, run = undefined }) {
    const classes = useStyles()
    const [data, setData] = useState({
        loading: false,
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
            setData({ ...data, clientToken: res.data.clientToken })
        }).catch(error => {
            setData({ ...data, error: error.response.data.error })
        })
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])

    // avoid naming errors in the buy function
    let deliveryAddress = data.address

    const buy = () => {
        setData({ ...data, loading: true })
        // nonce = payment method
        let nonce
        let getNonce = data.instance.requestPaymentMethod()
        .then(data => {
            nonce = data.nonce
            // send nonce to server
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(products)
            }
            processPayment(userId, token, paymentData).then(res => {
                // create a new order when user pay
                const orderData = {
                    products: products,
                    transaction_id: res.data.transaction.id,
                    amount: res.data.transaction.amount,
                    address: deliveryAddress
                }
                createOrder(userId, token, orderData).then(res => {
                    // empty cart after successful transaction
                    emptyCart(() => {
                        setRun(!run)
                        setData({ ...data, loading: false, success: true, address: '' })
                    })
                }).catch(error => {
                    console.log(error)
                    setData({ ...data, loading: false })
                })
            }).catch(error => {
                console.log('Error ' + error)
                setData({ ...data, loading: false })
            })
        }).catch(error => {
            setData({ ...data, error: error.message })
        })
    }

    const handleAddress = e => {
        setData({ ...data, address: e.target.value })
    }

    const showError = () => {
        return data.error && (
            <SnackbarContent
            message={
              <span>
                {data.error} <Link to="/signup">Please sign up</Link>
              </span>
            }
            close
            color="danger"
            icon="info_outline"
          />
        )
    }

    const showSuccess = () => {
        return data.success && (
            <SnackbarContent
            message={
            <span>
                Success! Your order has been confirmed
            </span>
            }
            close
            color="success"
            icon={Check}
            />
        )
    }

    const showLoading = () => (
        <CircularProgress style={{ display: data.loading ? '' : 'none' }} />
    )

    const showDropIn = () => (
        <div>
            <h2>Your cart summary</h2>
            <hr />
            <h2>Total: ${getTotal()}</h2>
            {showError()}
            {showSuccess()}
            {showLoading()}
            {data.clientToken !== null ? (
            <div>
                <CustomInput
                labelText="Delivery Address: "
                id="address"
                formControlProps={{
                    fullWidth: true,
                    className: classes.textArea
                }}
                inputProps={{
                    onChange: handleAddress,
                    value: data.address,
                    multiline: true,
                    rows: 5
                }}
                />
                <DropIn 
                options={{ authorization: data.clientToken }} 
                onInstance={instance => data.instance = instance} 
                />
                <Button onClick={buy} round color="success">
                    Complete Purchase
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

import React, { useState, useEffect } from 'react'
import { getProducts } from '../../../api/coreApi' 
import { isAuthenticated } from '../../../api/authApi'
import { createProduct } from '../../../api/adminApi' 
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from '@material-ui/core'
// @material-ui/icons
import Check from "@material-ui/icons/Check";
// core components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js"
import InputLabel from '@material-ui/core/InputLabel';

import styles from "assets/jss/material-kit-react/views/adminDashboardPage.js";

const useStyles = makeStyles(styles)

export default function AddProduct() {
    const classes = useStyles()
    const { user, token } = isAuthenticated()
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        image: '',
        error: '',
        loading: false,
        createdProduct: '',
        formData: ''
    })
    const { name, description, price, quantity, error, loading, createdProduct, formData } = values

    useEffect(() => {
        // get new form data using form data api by browser
        setValues({ ...values, formData: new FormData() })
    }, [])

    // higher order function to target name and event of form
    const handleChange = name => e => {
        // get files if its image else just grab the value
        const value = name === 'image' ? e.target.files[0] : e.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        setValues({ ...values, error: '', loading: true })
        createProduct(formData, user._id, token).then(res => {
            setValues({ ...values, name: '', description: '', price: '', quantity: '', image: '', loading: false, success: true, createdProduct: res.data.name, error: '' })
            setTimeout(() => {
                // refresh page in 1.5s to show updated info
                window.location.reload()
            }, 1500)
        }).catch(error => {
            setValues({ ...values, error: error.response.data.error })
        })
    }

    const showError = () => {
        return error && (
            <SnackbarContent
            message={
              <span>
                {error}
              </span>
            }
            close
            color="danger"
            icon="info_outline"
          />
        )
    }

    const showSuccess = () => {
        return createdProduct !== '' && (
            <SnackbarContent
            message={
            <span>
                Success! {createdProduct} has been added!
            </span>
            }
            close
            color="success"
            icon={Check}
            />
        )
    }

    const showLoading = () => (
        <CircularProgress style={{ display: loading ? '' : 'none' }} />
    )

    const newProductForm = () => (
        <Card>
            {showSuccess()}
            {showError()}
            <form className={classes.form} onSubmit={handleSubmit}>
                <CardHeader color="info" className={classes.cardHeader}>
                    <h4>New Product Information</h4>
                </CardHeader>
                <CardBody>
                    <input onChange={handleChange('image')} type='file' name='image' accept='image/*' />
                    <InputLabel>Upload Image</InputLabel>
                    <CustomInput
                        labelText="Name"
                        id="name"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: handleChange('name'),
                            value: name,
                            type: "text"
                        }}
                    />
                    <CustomInput
                        labelText="Description"
                        id="description"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: handleChange('description'),
                            value: description,
                            type: "text"
                        }}
                    />
                    <CustomInput
                        labelText="Price"
                        id="price"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: handleChange('price'),
                            value: price,
                            type: "number"
                        }}
                    />
                    <CustomInput
                        labelText="Quantity"
                        id="quantity"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: handleChange('quantity'),
                            value: quantity,
                            type: "number"
                        }}
                    />
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                    <Button round color="rose" onClick={handleSubmit}>
                        Add Product
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )

    return (
        <div>
            {showLoading()}
            {newProductForm()}
        </div>
    )
}

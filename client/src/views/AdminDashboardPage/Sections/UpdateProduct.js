import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import IdleWarning from '../../../helpers/IdleWarning' 
import { isAuthenticated } from '../../../api/authApi'
import { getSingleProduct, updateProduct } from '../../../api/adminApi' 
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
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/adminDashboardPage.js";

const useStyles = makeStyles(styles)

export default function UpdateProduct() {
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
    // get order id from parameters of route
    const { productId } = useParams()

    const init = () => {
        getSingleProduct(productId).then(res => {
            console.log(res.data)
            setValues({ ...values, name: res.data.name, description: res.data.description, price: res.data.price, quantity: res.data.quantity, formData: new FormData() })
        }).catch(error => {
            setValues({ ...values, error: error.response.data.error })
        })
    }

    useEffect(() => {
        init()
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
        updateProduct(productId, formData, user._id, token).then(res => {
            setValues({ ...values, name: '', description: '', price: '', quantity: '', image: '', loading: false, success: true, createdProduct: res.data.name, error: '' })
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
                Success! {createdProduct} has been updated!
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

    const updateProductForm = () => (
        <Card>
            {showSuccess()}
            {showError()}
            <form className={classes.form} onSubmit={handleSubmit}>
                <CardHeader color="info" className={classes.cardHeader}>
                    <h4>Product Information</h4>
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
                        Update Product
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )

    return (
        <div>
            <Header
            color="transparent"
            brand="Material Kit React"
            rightLinks={<HeaderLinks />}
            fixed
            changeColorOnScroll={{
            height: 400,
            color: "white"
            }}
            />
            <Parallax small filter image={require("assets/img/profile-bg.jpg")}>
                <div className={classes.headerContainer}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <h1 className={classes.header}>Hello and welcome {user.name}</h1>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <IdleWarning />
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8}>
                    {showLoading()}
                    {updateProductForm()}
                </GridItem>
            </GridContainer>
        </div>
    )
}

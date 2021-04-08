import React, { useState, useEffect } from 'react'
import IdleWarning from '../../helpers/IdleWarning' 
import { getProducts } from '../../api/productApi' 
// nodejs library that concatenates classes
//import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import ShopGrid from "components/Shop/ShopGrid.js"
import './ShopPage.css'
import SnackbarContent from "components/Snackbar/SnackbarContent.js"

import styles from "assets/jss/material-kit-react/views/shopPage.js";

const useStyles = makeStyles(styles)

export default function ShopPage() {
    //Define components in the module to take on materia styling
    const classes = useStyles()
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    //TEMP: Expand products or read from DB?
    const listProducts = () => {
        getProducts().then(res => {
            setProducts(res.data)
        }).catch(error => {
            setError(error)
        })
    }
    
    const testing = [
        {name: 'Testing',description: 'Description', price: '$10.99', images: [] },
        {name: 'Testing',description: 'Description', price: '$9.99', images: [] },
        {name: 'Testing',description: 'Description', price: '$8.99', images: [] },
        {name: 'Testing',description: 'Description', price: '$7.99', images: [] },
        {name: 'Testing',description: 'Description', price: '$6.99', images: [] },
        {name: 'Testing',description: 'Description', price: '$5.99', images: [] },
    ]
    

    

    

    //Something about applying an effect to the list?
    useEffect(() => {
        listProducts()
    }, [])

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
    
    return (
        <div>
            <Header
                color="transparent"
                brand="#testing"
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                height: 400,
                color: "white"
                }}
            />
            <Parallax small filter image={require("assets/img/bg2.jpg")} />
            <IdleWarning />
            <ShopGrid Products={testing}/>
        </div>
    )
}

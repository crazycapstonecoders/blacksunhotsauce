import React, { useState, useEffect } from 'react'
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


    //Read from DB?
    let output = products.getProducts
    let Temp = typeof(listProducts)

    if (listProducts === null){
        return (
            <p>Null: {listProducts}</p>
        )
    }

    if (listProducts === undefined){
        return (
            <p>Undefined: {listProducts}</p>
        )
    }


    //return the HTML with react generation tag
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
            <ShopGrid Products={testing}/>


        
        </div>
    )
}

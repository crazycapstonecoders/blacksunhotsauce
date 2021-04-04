import React, { useState, useEffect } from 'react'
import ReusableCard from '../../helpers/ReusableCard'
import { getProducts } from '../../api/productApi' 
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import './ShopPage.css'
import Placeholder from '../../assets/img/temp.png'
//import { render } from 'node-sass';

import styles from "assets/jss/material-kit-react/views/shopPage.js";

const useStyles = makeStyles(styles)

export default function ShopPage() {
    const classes = useStyles()
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const listProducts = () => {
        getProducts().then(res => {
            setProducts(res.data)
        }).catch(error => {
            setError(error)
        })
    }

    useEffect(() => {
        listProducts()
    }, [])
    
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
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <GridContainer spacing={4}>
                        {products.map((product, i) => (
                            <GridItem key={i} xs={12} sm={6} md={4}>
                                <ReusableCard product={product} showAddToCartButton={ product.quantity > 0 ? true : false } />
                            </GridItem> 
                        ))}
                    </GridContainer>
                </div>
            </div>
        </div>
    )
}

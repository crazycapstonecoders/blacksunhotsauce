import React from 'react'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import './ShopPage.css'

// import styles from "assets/jss/material-kit-react/views/loginPage.js";

// import image from "assets/img/bg7.jpg";

// const useStyles = makeStyles(styles);

export default function ShopPage(props) {
    // const classes = useStyles()
    const { ...rest } = props

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
                {...rest}
            />
            <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
            <div id="divShop" class="flex grid-constainer">
                <div class="card-Shop col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <img source=""></img>
                    <h1>Product Name</h1>
                    <p alt="product-Image">Description</p>
                    <button type="button" action="">Add to cart</button>
                    <input type="number"></input>
                </div>
                <div class="card-Shop col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <img source=""></img>
                    <h1>Product Name</h1>
                    <p alt="product-Image">Description</p>
                    <button type="button" action="">Add to cart</button>
                    <input type="number"></input>
                </div>
                <div class="card-Shop col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <img source=""></img>
                    <h1>Product Name</h1>
                    <p alt="product-Image">Description</p>
                    <button type="button" action="">Add to cart</button>
                    <input type="number"></input>
                </div>
                <div class="card-Shop col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <img source=""></img>
                    <h1>Product Name</h1>
                    <p alt="product-Image">Description</p>
                    <button type="button" action="">Add to cart</button>
                    <input type="number"></input>
                </div>
                <div class="card-Shop col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <img source=""></img>
                    <h1>Product Name</h1>
                    <p alt="product-Image">Description</p>
                    <button type="button" action="">Add to cart</button>
                    <input type="number"></input>
                </div>
            </div>
        </div>
    )
}

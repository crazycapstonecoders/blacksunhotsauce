import React from 'react'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import './ShopPage.css'
import Placeholder from '../../assets/img/temp.png'

// import styles from "assets/jss/material-kit-react/views/loginPage.js";

// import image from "assets/img/bg7.jpg";

// const useStyles = makeStyles(styles);

export default function ShopPage(props) {
    // const classes = useStyles()
    const { ...rest } = props

    //Request Products from the DB
    const products = ""
    
    //Setup the HTTP request


    //Below is the returned page structure
    //Some form of loop will have to be integrated to process the return from DB generate the card objects
    //on add to cart, the output would be sent to the cart object with the ID flag (hidden from user) to identify which product



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
            <a name="Top"></a>
            <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
            products.forEach(element)
            

            <div id="divShop" class="flex grid-container">
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <div class="card-Shop">
                        <div class="card-shop-image">
                            <img src={Placeholder} alt="placeholder"></img>
                        </div>
                        <h1>Product Name</h1>
                        <p alt="product-Image">Description</p>
                        <div class="flex grid-container">
                            <form action="">
                                <button type="submit" action="" class="col-md-8 col-xs-12">Add to cart</button>
                                <input type="number" class="col-md-4 col-xs-12"></input>
                                <input type="text" class="hidden" value="#ProductID" disabled></input>
                            </form>
                        </div>
                    </div>
                </div>

                <p class="hidden">Below this is duplicates of the above code, when the page is generated it would loop and generate this per item</p>

                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <div class="card-Shop">
                        <div class="card-shop-image">
                            <img src={Placeholder} alt="placeholder"></img>
                        </div>
                        <h1>Product Name</h1>
                        <p alt="product-Image">Description</p>
                        <div class="flex grid-container">
                            <form action="">
                                <button type="submit" action="" class="col-md-8 col-xs-12">Add to cart</button>
                                <input type="number" class="col-md-4 col-xs-12"></input>
                                <input type="text" class="hidden" value="#ProductID" disabled></input>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <div class="card-Shop">
                        <div class="card-shop-image">
                            <img src={Placeholder} alt="placeholder"></img>
                        </div>
                        <h1>Product Name</h1>
                        <p alt="product-Image">Description</p>
                        <div class="flex grid-container">
                            <form action="">
                                <button type="submit" action="" class="col-md-8 col-xs-12">Add to cart</button>
                                <input type="number" class="col-md-4 col-xs-12"></input>
                                <input type="text" class="hidden" value="#ProductID" disabled></input>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <div class="card-Shop">
                        <div class="card-shop-image">
                            <img src={Placeholder} alt="placeholder"></img>
                        </div>
                        <h1>Product Name</h1>
                        <p alt="product-Image">Description</p>
                        <div class="flex grid-container">
                            <form action="">
                                <button type="submit" action="" class="col-md-8 col-xs-12">Add to cart</button>
                                <input type="number" class="col-md-4 col-xs-12"></input>
                                <input type="text" class="hidden" value="#ProductID" disabled></input>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <div class="card-Shop">
                        <div class="card-shop-image">
                            <img src={Placeholder} alt="placeholder"></img>
                        </div>
                        <h1>Product Name</h1>
                        <p alt="product-Image">Description</p>
                        <div class="flex grid-container">
                            <form action="">
                                <button type="submit" action="" class="col-md-8 col-xs-12">Add to cart</button>
                                <input type="number" class="col-md-4 col-xs-12"></input>
                                <input type="text" class="hidden" value="#ProductID" disabled></input>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <div class="card-Shop">
                        <div class="card-shop-image">
                            <img src={Placeholder} alt="placeholder"></img>
                        </div>
                        <h1>Product Name</h1>
                        <p alt="product-Image">Description</p>
                        <div class="flex grid-container">
                            <form action="">
                                <button type="submit" action="" class="col-md-8 col-xs-12">Add to cart</button>
                                <input type="number" class="col-md-4 col-xs-12"></input>
                                <input type="text" class="hidden" value="#ProductID" disabled></input>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <div class="card-Shop">
                        <div class="card-shop-image">
                            <img src={Placeholder} alt="placeholder"></img>
                        </div>
                        <h1>Product Name</h1>
                        <p alt="product-Image">Description</p>
                        <div class="flex grid-container">
                            <form action="">
                                <button type="submit" action="" class="col-md-8 col-xs-12">Add to cart</button>
                                <input type="number" class="col-md-4 col-xs-12"></input>
                                <input type="text" class="hidden" value="#ProductID" disabled></input>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <div class="card-Shop">
                        <div class="card-shop-image">
                            <img src={Placeholder} alt="placeholder"></img>
                        </div>
                        <h1>Product Name</h1>
                        <p alt="product-Image">Description</p>
                        <div class="flex grid-container">
                            <form action="">
                                <button type="submit" action="" class="col-md-8 col-xs-12">Add to cart</button>
                                <input type="number" class="col-md-4 col-xs-12"></input>
                                <input type="text" class="hidden" value="#ProductID" disabled></input>
                            </form>
                        </div>
                    </div>
                </div>
                
                

                <p class="hidden">Below this point is non-generated code</p>

                
                


            </div>

            <div class="col-xs-12">
                    <a href="#top" class="button">Return to Top of page</a>
                </div>
        </div>
    )
}

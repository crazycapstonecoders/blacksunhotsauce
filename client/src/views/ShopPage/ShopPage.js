import React from 'react'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import './ShopPage.css'
import Placeholder from '../../assets/img/temp.png'
import { render } from 'node-sass';

// import styles from "assets/jss/material-kit-react/views/loginPage.js";

// import image from "assets/img/bg7.jpg";

// const useStyles = makeStyles(styles);


class product_Card extends React.Component{
    //The below method is called when the component is rendered
    render(){
        //Init Variables
        imgProduct = "";
        nameProduct = "";
        descProduct = "";
        costProduct = "";
        //Check if the input is null
        if (!thisProduct){
            //No product input, Return a placeholder card
            return (
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <div class="card-Shop">
                        <p>Error: No product input for this card!</p>
                    </div>
                </div>
            )
        } else{
            imgProduct = thisProduct.image
            nameProduct = thisProduct.name
            descProduct = thisProduct.description
            costProduct = thisProduct.price
        }
        return (
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <div class="card-Shop">
                    <div class="card-shop-image">
                        <img src={imgProduct} alt="placeholder"></img>
                    </div>
                    <h1>{nameProduct}</h1>
                    <p>{costProduct}</p>
                    <p>{descProduct}</p>
                    <div class="flex grid-container">
                        <form action="">
                            <button type="submit" action="" class="col-md-8 col-xs-12">Add to cart</button>
                            <input type="number" class="col-md-4 col-xs-12"></input>
                            <input type="text" class="hidden" value="#ProductID" disabled></input>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    
}

function product_grid(products){

    //TODO this will need a good input setup
    return (
        <div id="divShop" class="flex grid-container">
            <product_Card thisProduct={product}/>
        </div>
    )
}




function test(){
    return (<p>Meep</p>)
}

export default function ShopPage(props) {
    // const classes = useStyles()
    const { ...rest } = props

    //Request Products from the DB
    const products = ""
    products = [
        {name: 'Testing',description: 'Description', price: '$10.99', images: 'NYI'},
        {name: 'Testing',description: 'Description', price: '$9.99', images: 'NYI'},
        {name: 'Testing',description: 'Description', price: '$8.99', images: 'NYI'},
        {name: 'Testing',description: 'Description', price: '$7.99', images: 'NYI'},
        {name: 'Testing',description: 'Description', price: '$6.99', images: 'NYI'},
        {name: 'Testing',description: 'Description', price: '$5.99', images: 'NYI'},
    ]
    
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
            <product_grid />
            

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

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

//Class: product_Card
//---This is the rendering class for a singular product
class product_Card extends React.Component{
    //The below method is called when the component is rendered
    render(){
        //Init Variables
        let imgProduct = "../../assets/img/temp.png";
        let nameProduct = "Name";
        let descProduct = "Description";
        let costProduct = "$0.00";
        //Check if the input is null
        if (!this.thisProduct){
            //No product input, Return a placeholder card
            return (
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <div class="card-Shop">
                        <p>Error: No product input for this card!</p>
                    </div>
                </div>
            )
        } else{
            //Load the values fo generating the HTML
            imgProduct = this.thisProduct.image
            nameProduct = this.thisProduct.name
            descProduct = this.thisProduct.description
            costProduct = this.thisProduct.price
        }
        //Return HTML with the rendering per
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

//Class: product_Grid
//---This class is the rendering class for the product grid
//---Requires a products object to be defined in is calling
class product_grid extends React.component{
    //The below method is called when the component is rendered
    render(){
        //Check if the input is defined
        if (!this.thisProducts){
            return(
                <div id="divShop" class="flex grid-container">
                    <h1>Error: Unable to load products!</h1>
                </div>
            )
        }
        //Map the products (Doesnt seem to be what i need as it maps it to expanded HTML, but thats not viable from my perspective?)
        let output = this.thisProducts.map((currentProduct)=>
            <product_card thisProduct={currentProduct}/>
        );
        //Return HTML rendering of the product grid
        return (
            <div id="divShop" class="flex grid-container">
                {output}
            </div>
        )
    }
}

export default function ShopPage(props) {
    // const classes = useStyles()
    const { ...rest } = props

    //Request Products from the DB
    const products = ""

    //TODO
    //This is testing code
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
            <product_grid thisProducts ={this.products}/>
            
            <p class="hidden">
                Below this point is the template that the generated code is based on
                Keeping it here until I can get the above working
            </p>
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

                <p class="hidden">Below this point is non-generated code</p>

                
                


            </div>

            <div class="col-xs-12">
                    <a href="#top" class="button">Return to Top of page</a>
                </div>
        </div>
    )
}

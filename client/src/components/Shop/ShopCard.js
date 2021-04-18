import React, { useState } from "react";
// nodejs library to set properties for components
import PropTypes, { array } from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//Imports for Ians Code
import Carousel from "react-slick"
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import Check from "@material-ui/icons/Check";
import Badge from 'components/Badge/Badge.js';
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js"
import SnackbarContent from "components/Snackbar/SnackbarContent.js"
import { Link } from 'react-router-dom'

import { addItem, updateItem, removeItem } from '../../helpers/cartHelpers'

//Globals for settings

//---Carousel
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false
}
const styles = {
    ...imagesStyles,
    textMuted: {
      color: "#6c757d"
    },
    textRight: {
      textAlign: "right"
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      height: '500px'
    }
  }


const useStyles = makeStyles(styles);



/**
 * Component: Shop_Card
 * ---This component generates the shopcard object as spawned from the shopGrid object
 * @param {*} props  //This is the input product as defined in props
 * @param {*} param1 //These are the toggles used in Ians code
 * @returns 
 */
export default function Shop_Card({product,showAddToCartButton = true},{
        setRun = f => f, // default value of function 
        run = undefined})
    {
    console.log("Triggering function:");
    //Init Variables
    var nameProduct = "Name";
    var descProduct = "Description";
    var costProduct = "$0.00";

    //Ians code is imported Below
    const [success, setSuccess] = useState(false)
    const [count, setCount] = useState(product.count)
    const classes = useStyles();

    const addToCart = () => {
        addItem(product, () => {
            setSuccess(true)
        })
    }

    const showSuccess = () => {
        return success && (
            <SnackbarContent
            message={
            <span>
                Item added to cart! <Link to="/cart">View Cart</Link>
            </span>
            }
            close
            color="success"
            icon={Check}
            />
        )
    }

    const showAddToCartBtn = showAddToCartButton => {
        return showAddToCartButton && (
            <Button onClick={addToCart} color="info">Add To Cart</Button>
        )
    }

    const handleChange = productId => e => {
        // run use effect in parent component
        setRun(!run)
        // make sure we don't have negative value
        setCount(e.target.value < 1 ? 1 : e.target.value)
        if(e.target.value >= 1) {
            updateItem(productId, e.target.value)  
        }
    }

    const showAvailability = quantity => {
        return quantity > 0 ? (
            <Badge color="info">In Stock</Badge>
        ) : (
            <Badge color="danger">Out Of Stock</Badge>
        )
    }
    //End of Ians Code

    //Check if the input is null
    if (product === null || product === undefined){
        //No product input, Return a placeholder card
        return (
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <div class="card-Shop">
                    <p>Error: No product input for this card!</p>
                </div>
            </div>
        )
    } else{
        //Load the values for generating the HTML
        nameProduct = product.name
        descProduct = product.description
        costProduct = product.price
    }

    //Check if we are rendering the product
    if (product.quantity <= 0){
        showAddToCartButton = false;
    }

    //Return HTML with the rendering
    return (
        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
            <div class="card-Shop">
                <div class="card-content">
                    <div class="card-image">
                        <Carousel { ...settings }>
                            {product.images.map((image, i) => (
                                <div key={i}>
                                    <img
                                    style={{height: "180px", width: "100%", display: "block"}}
                                    className={classes.imgCardTop}
                                    src={image.url}
                                    alt="Card-img-cap"
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    
                    <h1>{nameProduct}</h1>
                    <div class="price-avail flex">
                        <div class="spacer col-xl-1 col-lg-1 col-md-2 col-sm-1 col-xs-1">
                            <br/>
                        </div>
                        <div class="col-xl-5 col-lg-5 col-md-3 col-sm-4 col-xs-4">
                            <p class="cost">{costProduct}</p>
                        </div>
                        <div class="col-xl-5 col-lg-5 col-md-5 col-sm-6 col-xs-6">
                            {showAvailability(product.quantity)}
                        </div>
                        <div class="spacer col-xl-1 col-lg-1 col-md-2 col-sm-1 col-xs-1">
                            <br/>
                        </div>
                    </div>
                    <p class="description">{descProduct}</p>
                
                    <div class="card-shop-control">
                        <form action="">
                            {showAddToCartBtn(showAddToCartButton)}
                        </form>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

Shop_Card.propTypes = {
    product: PropTypes.object
  };


  
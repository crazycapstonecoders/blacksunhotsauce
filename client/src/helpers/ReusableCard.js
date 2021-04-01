/**
 * This is a reusable card component for Products, Cart etc. 
 * It is customizable based on incoming props and conditional rendering
 */
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { addItem, updateItem, removeItem } from './cartHelpers'
// react component for creating beautiful carousel
import Carousel from "react-slick"
// @material-ui/core components
import { TextField } from '@material-ui/core'
// core componenets
import { makeStyles } from "@material-ui/core/styles";
import Badge from 'components/Badge/Badge.js';
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";

import { cardTitle } from "assets/jss/material-kit-react.js";

const styles = {
  ...imagesStyles,
  cardTitle,
  textMuted: {
    color: "#6c757d"
  },
  textRight: {
    textAlign: "right"
  },
  card: {
    display: 'flex',
    flexDirection: 'column'
  }
};

const useStyles = makeStyles(styles)

export default function ReusableCard({ 
    product, 
    showAddToCartButton = true, 
    cartUpdate = false, 
    showRemoveCartButton = false, 
    setRun = f => f, // default value of function 
    run = undefined 
}) {
    const classes = useStyles()
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false
    }
    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(product.count)

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true)
        })
    }

    const shouldRedirect = redirect => {
        if(redirect) {
            return <Redirect to='/cart' />
        }
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

    const showCartUpdateOptions = cartUpdate => {
        return cartUpdate && (
            <TextField
            label="Cart Items"
            type="number"
            style={{ marginLeft: '5%' }}
            value={count}
            onChange={handleChange(product._id)}
          />
        )
    }

    const showRemoveCartBtn = showRemoveCartButton => {
        return showRemoveCartButton && (
            <Button onClick={() => { removeItem(product._id); setRun(!run) }} color="danger">Remove From Cart</Button>
        )
    }

    const showAvailability = quantity => {
        return quantity > 0 ? (
            <Badge color="info">In Stock</Badge>
        ) : (
            <Badge color="danger">Out Of Stock</Badge>
        )
    }

    return (
        <Card className={classes.card}>
            {shouldRedirect(redirect)}
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
            <CardBody>
                <h4 className={classes.cardTitle}>{product.name}</h4>
                <p>{product.description}</p>
                <hr></hr>
                {showAvailability(product.quantity)}
                <p>Quantity: {product.quantity}</p>
                <p>${product.price}</p>
                <Button color="primary">View Product</Button>
                {showAddToCartBtn(showAddToCartButton)}
                {showCartUpdateOptions(cartUpdate)}
                {showRemoveCartBtn(showRemoveCartButton)}
            </CardBody>
        </Card>
    )
}

import React from "react";
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




export default function Shop_Card(props){
    console.log("Triggering function:");
    //Init Variables
    var nameProduct = "Name";
    var descProduct = "Description";
    var costProduct = "$0.00";
    var IDProduct = IDProduct = "######";
    const classes = useStyles();
    //Check if the input is null
    if (props.product === null || props.product === undefined){
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
        nameProduct = props.product.name
        descProduct = props.product.description
        costProduct = props.product.price
        IDProduct = "######"
    }
    //Ians code is imported Below
    const [success, setSuccess] = useState(false)
    const [count, setCount] = useState(product.count)

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

    const showCartUpdateOptions = cartUpdate => {
        return cartUpdate && (
            <CustomInput
            labelText="Cart Items"
            id="items"
            formControlProps={{
                fullWidth: false
            }}
            inputProps={{
                onChange: handleChange(product._id),
                value: count,
                type: "number"
              }}
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
    //End of Ians Code

    //Return HTML with the rendering
    return (
        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
            <div class="card-Shop">
            <Carousel { ...settings }>
                {props.product.images.map((image, i) => (
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
                <h1>{nameProduct}</h1>
                <p>{costProduct}</p>
                <p>{descProduct}</p>
                <div class="flex grid-container">
                    <form action="">
                        <button type="submit" action="" class="col-md-8 col-xs-12">Add to cart</button>
                        <input type="number" class="col-md-4 col-xs-12"></input>
                        <input type="text" class="hidden" value={IDProduct} disabled></input>
                    </form>
                </div>
            </div>
        </div>
    )
}

Shop_Card.propTypes = {
    product: PropTypes.object
  };
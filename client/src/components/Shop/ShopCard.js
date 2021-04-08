import React from "react";
// nodejs library to set properties for components
import PropTypes, { array } from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//Import the placeholder image
import Placeholder from '../../assets/img/temp.png'
import Carousel from "react-slick"
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";

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
import React from "react";
// nodejs library to set properties for components
import PropTypes, { array } from "prop-types";
// @material-ui/core components
//import { makeStyles } from "@material-ui/core/styles";
//Import the placeholder image
import Placeholder from '../../assets/img/temp.png'

export default function Shop_Card(props){
    console.log("Triggering function:");
    //Init Variables
    var imgProduct = {Placeholder};
    var nameProduct = "Name";
    var descProduct = "Description";
    var costProduct = "$0.00";
    var IDProduct = IDProduct = "######";
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
        imgProduct = props.product.image
        nameProduct = props.product.name
        descProduct = props.product.description
        costProduct = props.product.price
        IDProduct = "######"
    }
    //Return HTML with the rendering
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
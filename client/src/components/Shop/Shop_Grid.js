import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes, { array } from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

export default function Shop_Grid(props) {
    //Check if the input is defined
    if (props.Products.length <= 0){
        return(
            <div id="divShop" class="flex grid-container">
                <h1 class="error">Error: Unable to load products!</h1>
            </div>
        )
    } else{
        //Map the input to the output form #TODO
        //let output = this.thisProducts.map((currentProduct)=>
        //<product_card thisProduct={currentProduct}/>
    //);
    }
    
    //Return HTML rendering of the product grid
    return (
        <div id="divShop" class="flex grid-container">
            <p class="hidden">The below code is placeholder</p>
            <p>{props.Products}</p>
        </div>
    )
}

Shop_Grid.propTypes = {
    Products: PropTypes.array
  };
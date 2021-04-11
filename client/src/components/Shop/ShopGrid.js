import React from "react";
// nodejs library to set properties for components
import PropTypes, { array } from "prop-types";
// @material-ui/core components
//import { makeStyles } from "@material-ui/core/styles";

import ShopCard from "./ShopCard.js";

export default function Shop_Grid({Products}) {
    //Check if the input is defined
    if (Products === undefined || Products.length <= 0){
        return(
            <div id="divShop" class="flex grid-container">
                <h1 class="error">Error: Unable to load products!</h1>
            </div>
        )
    } else{
        //Map the input to the output form
        var output = ""
        output = Products.map((product)=> <ShopCard product={product} showAddToCartButton={ product.quantity > 0 ? true : false }/>)
    }
    //Return HTML rendering of the product grid
    return (
        <div id="divShop" class="flex grid-container">
            <p class="hidden">The below code should inset the resulting HTML inside the page</p>
            {output}
        </div>
    )
}

Shop_Grid.propTypes = {
    Products: PropTypes.array
  };
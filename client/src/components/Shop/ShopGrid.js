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
            <div id="divShop" className="flex grid-container">
                <h1 className="error">Error: Unable to load products!</h1>
            </div>
        )
    }
    //Return HTML rendering of the product grid
    return (
        <div id="divShop" className="flex grid-container">
            <p className="hidden">The below code should insert the resulting HTML inside the page</p>
            {Products.map((product,i)=> <ShopCard key={i} product={product} showAddToCartButton={ product.quantity > 0 ? true : false }/>)}
        </div>
    )
}

Shop_Grid.propTypes = {
    Products: PropTypes.array
  };
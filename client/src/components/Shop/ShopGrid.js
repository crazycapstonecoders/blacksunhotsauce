import React from "react";
// nodejs library to set properties for components
import PropTypes, { array } from "prop-types";
// @material-ui/core components
//import { makeStyles } from "@material-ui/core/styles";

import ShopCard from "./ShopCard.js";

export default function Shop_Grid(props) {
    //Check if the input is defined
    if (props.Products === undefined || props.Products.length <= 0){
        return(
            <div id="divShop" class="flex grid-container">
                <h1 class="error">Error: Unable to load products!</h1>
            </div>
        )
    } else{
        //Map the input to the output form #TODO
        var output = ""
        var test = ""
        for (var I = 0 ; I <props.Products.length;I++){
            output += <ShopCard product={props.Products[I]}/>
        }
    }
    //Return HTML rendering of the product grid
    return (
        <div id="divShop" class="flex grid-container">
            <p class="hidden">The below code should inset the resulting HTML inside the page</p>

            <div>{output}</div>
            <p>{test}</p>
        </div>
    )
}

Shop_Grid.propTypes = {
    Products: PropTypes.array
  };
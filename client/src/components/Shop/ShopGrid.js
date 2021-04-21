import React from "react";
import ShopCard from "./ShopCard.js";

export default function Shop_Grid({Products}) {
    if (Products === undefined || Products.length <= 0){
        return(
            <div id="divShop" className="flex grid-container">
                <h1 className="error">Error: Unable to load products!</h1>
            </div>
        )
    }

    return (
        <div id="divShop" className="flex grid-container">
            <p className="hidden">The below code should insert the resulting HTML inside the page</p>
            {Products.map((product,i)=> <ShopCard key={i} product={product} showAddToCartButton={ product.quantity > 0 ? true : false }/>)}
        </div>
    )
}
import React from "react";
import ShopCard from "./ShopCard.js";
import '../ShopPage.css'

export default function Shop_Grid({products}) {
    if (products === undefined || products.length <= 0){
        return(
            <div id="divShop" className="flex grid-container">
                <h1 className="error">Error: Unable to load products!</h1>
            </div>
        )
    }

    return (
        <div id="divShop" className="flex grid-container">
            
        </div>
    )
}

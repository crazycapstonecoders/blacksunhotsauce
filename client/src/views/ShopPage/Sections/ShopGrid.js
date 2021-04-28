import React from "react";
import ShopCard from "./ShopCard.js";


export default function Shop_Grid({products}) {
    if (products === undefined || products.length <= 0){
        return(
            <p className="hidden">This is a stub for if error checks are needed here</p>
        )
    }

    return (
        <div id="divShop" className="flex grid-container">
            {products.map((product,i)=> <ShopCard key={i} product={product} showAddToCartButton={ product.quantity > 0 ? true : false }/>)}
        </div>
    )
}

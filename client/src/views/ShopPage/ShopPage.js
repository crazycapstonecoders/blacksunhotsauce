import React, { useState, useEffect } from 'react'
import IdleWarning from '../../helpers/IdleWarning' 
import { getProducts } from '../../api/coreApi' 
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import ShopCard from "./Sections/ShopCard.js"

export default function ShopPage() {
    const [products, setProducts] = useState([])
    const [error, setError] = useState('')
    
    //Get the products from the Database
    const listProducts = () => {
        getProducts().then(res => {
            setProducts(res.data)
        }).catch(error => {
            setError(error)
        })
    }
    
    useEffect(() => {
        listProducts()
    }, [])

    if (products === undefined || products.length <= 0){
        return(
            <div id="divShop" className="flex grid-container">
                <h1 className="error">Error: Unable to load products!</h1>
            </div>
        )
    }

    return (
        <div>
            <Header
                color="transparent"
                brand="#testing"
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                height: 250,
                color: "white"
                }}
            />
            <Parallax small image={require("assets/img/parallax.png")} />
            <IdleWarning />
            <div id="divShop" className="flex grid-container">
                <p className="hidden">The below code should insert the resulting HTML inside the page</p>
                {products.map((product,i)=> <ShopCard key={i} product={product} showAddToCartButton={ product.quantity > 0 ? true : false }/>)}
            </div>
        </div>
    )
}

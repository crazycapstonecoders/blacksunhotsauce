import React, { useState, useEffect } from 'react'
import IdleWarning from '../../helpers/IdleWarning' 
import { getProducts } from '../../api/coreApi' 
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import ShopGrid from "./Sections/ShopGrid.js"
import './ShopPage.css'

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
            <ShopGrid products={products}/>
        </div>
    )
}

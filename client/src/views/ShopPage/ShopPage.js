import React, { useState, useEffect } from 'react'
import IdleWarning from '../../helpers/IdleWarning' 
import { getProducts } from '../../api/coreApi' 
// nodejs library that concatenates classes
// @material-ui/core components
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import ShopGrid from "components/Shop/ShopGrid.js"
import '../../assets/css/ShopPage.css'




export default function ShopPage() {
    //Define components in the module to take on materia styling

    const [products, setProducts] = useState([])
    const [error, setError] = useState('')

    //TEMP: Expand products or read from DB?
    const listProducts = () => {
        getProducts().then(res => {
            console.log(res.data)
            setProducts(res.data)
        }).catch(error => {
            setError(error)
        })
    }
    

    //The below lines are for testing without the server operating for styling purposes (faster loading between changes)
    //Please leave in until we are done with the styling pass
    const testing = [
        {name: 'Testing',description: 'hasdfjkjasdjkfashjkfgjashjdfhjkasdfhjkhasjkdhfhasjkfhjkhaskdhfjkhasfhjkhasdkhfjkahjksdhjkfhjkashfkhasjkhfhaskhdfhashdfjkasjkfjkhsadhfjkhasdhfjkasdhjfasdhfhksdhakfhasjkhfsdhafjhjkshfjkhsadjkfhjkasfhsjdhfhjhsdfhjsdhjkhfghdjkfghjkdhfghdjg', price: '$10.99', images: [], quantity: 10 },
        {name: 'Testing',description: 'Description', price: '$9.99', images: [] },
        {name: 'Testing',description: 'Description', price: '$8.99', images: [] },
        {name: 'Testing',description: 'Description', price: '$7.99', images: [] },
        {name: 'Testing',description: 'Description', price: '$6.99', images: [] },
        {name: 'Testing',description: 'Description', price: '$5.99', images: [] },
    ]
    

    //Something about applying an effect to the list?
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
            <Parallax small filter image={require("assets/img/bg2.jpg")} />
            <IdleWarning />
            <ShopGrid Products={products}/>
        </div>
    )
}

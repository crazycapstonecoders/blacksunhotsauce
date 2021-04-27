import React, { useState, useEffect } from 'react'
import IdleWarning from '../../helpers/IdleWarning' 
import { getProducts } from '../../api/coreApi' 
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import ShopGrid from "./Sections/ShopGrid.js"
import 'ShopPage.scss'

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
// import React, { useState, useEffect } from 'react'
// import ReusableCard from '../../helpers/ReusableCard'
// import IdleWarning from '../../helpers/IdleWarning' 
// import { getProducts } from '../../api/coreApi' 
// // nodejs library that concatenates classes
// import classNames from "classnames";
// // @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
// // core components
// import Header from "components/Header/Header.js";
// import HeaderLinks from "components/Header/HeaderLinks.js";
// import Parallax from "components/Parallax/Parallax.js";
// import GridContainer from "components/Grid/GridContainer.js";
// import GridItem from "components/Grid/GridItem.js";
// import SnackbarContent from "components/Snackbar/SnackbarContent.js"

// import styles from "assets/jss/material-kit-react/views/shopPage.js";

// import '../ShopPage.scss'

// const useStyles = makeStyles(styles)

// export default function ShopPage() {
//     const classes = useStyles()
//     const [products, setProducts] = useState([])
//     const [error, setError] = useState(false)

//     const listProducts = () => {
//         getProducts().then(res => {
//             setProducts(res.data)
//         }).catch(error => {
//             setError(error)
//         })
//     }

//     useEffect(() => {
//         listProducts()
//     }, [])

//     const showError = () => {
//         return error && (
//             <SnackbarContent
//             message={
//                 <span>
//                 {error}
//                 </span>
//             }
//             close
//             color="danger"
//             icon="info_outline"
//             />
//         )
//     }
    
//     return (
//         <div>
//             <Header
//                 color="transparent"
//                 brand="#testing"
//                 rightLinks={<HeaderLinks />}
//                 fixed
//                 changeColorOnScroll={{
//                 height: 400,
//                 color: "white"
//                 }}
//             />
//             <Parallax small filter image={require("assets/img/parallax.png")} />
//             <IdleWarning />
//             <div className={classNames(classes.main, classes.mainRaised)}>
//                 {showError()}
//                 <div className={classes.container}>
//                     <GridContainer spacing={4}>
//                         {products.map((product, i) => (
//                             <GridItem key={i} xs={12} sm={6} md={4}>
//                                 <ReusableCard product={product} showAddToCartButton={ product.quantity > 0 ? true : false } />
//                             </GridItem> 
//                         ))}
//                     </GridContainer>
//                 </div>
//             </div>
//         </div>
//     )
// }
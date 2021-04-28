import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCart } from '../../helpers/cartHelpers'
import ReusableCard from '../../helpers/ReusableCard'
import IdleWarning from '../../helpers/IdleWarning'
import Checkout from './Sections/Checkout'
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-kit-react/views/cartPage.js";

// import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function CartPage() {
    const classes = useStyles()
    const [items, setItems] = useState([])
    const [run, setRun] = useState(false)

    // to avoid infinite loop and update display
    // pass in the run state to inform parent component of any changes
    // from child component
    useEffect(() => {
        setItems(getCart())
    }, [run])

    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                {items.map((product, i) => (
                    <ReusableCard 
                    key={i} 
                    product={product} 
                    showAddToCartButton={false} 
                    cartUpdate={true} 
                    showRemoveCartButton={true}
                    setRun={setRun}
                    run={run} />
                ))}
            </div>
        )
    }

    const noItemsMessage = () => (
        <h2>Your cart is empty. <br/><Link to='/shop'>Continue shopping</Link></h2>
    )

    return (
        <div>
            <Header
                color="transparent"
                brand="Material Kit React"
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                height: 400,
                color: "white"
                }}
            />
            <Parallax small filter image={require("assets/img/parallax.png")} />
            <IdleWarning />
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div className={classes.container}>
                        <GridContainer justify='center'>
                            <GridItem xs={12} sm={12} md={4} className={classes.cartItem}>
                                {items.length > 0 ? showItems(items) : noItemsMessage()}
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4} className={classes.checkout}>
                                <Checkout products={items} setRun={setRun} run={run} />
                            </GridItem>
                        </GridContainer>  
                    </div>
                </div>
        </div>
    )
}

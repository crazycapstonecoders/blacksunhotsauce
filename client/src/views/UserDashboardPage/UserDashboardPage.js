import React from 'react'
import { isAuthenticated } from '../../api/authApi'
import UserUpdate from "./Sections/UserUpdate" 
import UserOrderHistory from "./Sections/UserOrderHistory" 
import IdleWarning from '../../helpers/IdleWarning'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-kit-react/views/userDashboardPage.js";

const useStyles = makeStyles(styles);

export default function UserDashboardPage() {
    const classes = useStyles()
    const { user: { name } } = isAuthenticated()

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
            <Parallax small filter image={require("assets/img/profile-bg.jpg")}>
                <div className={classes.headerContainer}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <h1 className={classes.header}>Hello and welcome {name}</h1>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <IdleWarning />
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={4} className={classes.infoItem}>
                        {UserUpdate()}
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4} className={classes.purchaseItem}>
                        {UserOrderHistory()}
                    </GridItem>
                </GridContainer>  
            </div>
        </div>
    )
}

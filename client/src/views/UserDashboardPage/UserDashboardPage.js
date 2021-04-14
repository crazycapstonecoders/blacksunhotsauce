import React from 'react'
import { isAuthenticated } from '../../api/authApi'
import UserUpdate from "./Sections/UserUpdate" 
import UserOrderHistory from "./Sections/UserOrderHistory" 
import IdleWarning from '../../helpers/IdleWarning'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Update from "@material-ui/icons/Update";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";

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
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8}>
                    <NavPills
                        alignCenter
                        color="primary"
                        tabs={[
                        {
                            tabButton: "Order history",
                            tabIcon: Dashboard,
                            tabContent: <UserOrderHistory />
                        },
                        {
                            tabButton: "Manage Information",
                            tabIcon: Update,
                            tabContent: <UserUpdate />
                        }
                        ]}
                    />
                </GridItem>
            </GridContainer>
        </div>
    )
}

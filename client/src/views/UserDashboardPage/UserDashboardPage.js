import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { isAuthenticated } from '../../api/authApi'
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/userDashboardPage.js";

const useStyles = makeStyles(styles);

export default function UserDashboardPage(props) {
    const classes = useStyles()
    const { ...rest } = props
    const { user: { _id, username, email, role } } = isAuthenticated()

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
                {...rest}
            />
            <Parallax small filter image={require("assets/img/profile-bg.jpg")}>
                <div className={classes.headerContainer}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <h1 className={classes.header}>Hello and welcome {username}</h1>
                        </GridItem>
                    </GridContainer>
                </div>
            </Parallax>
            <div className={classes.container}>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={4} className={classes.infoItem}>
                        <Card>
                            <CardHeader color="info" className={classes.cardHeader}>
                                <h4>User Information</h4>
                        </CardHeader>
                            <CardBody>
                                <h4>{username}</h4>
                                <hr />
                                <h4>{email}</h4>
                                <hr />
                                <h4>{role === 1 ? 'Admin' : 'Registered User'}</h4>
                                <hr />
                            </CardBody>
                            <CardFooter className={classes.cardFooter}>
                                <Button round color="rose" to={`/profile/${_id}`} component={Link}>
                                    Update Info
                                </Button>
                                <hr />
                                <Button color="info" to='/cart' component={Link}>
                                    View Cart
                                </Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4} className={classes.purchaseItem}>
                        <Card>
                            <CardHeader color="info" className={classes.cardHeader}>
                                <h4>Purchase History</h4>
                            </CardHeader>
                            <CardBody>
                                <hr />
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>  
            </div>
        </div>
    )
}

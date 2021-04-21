import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { isAuthenticated } from '../../../api/authApi'
import { getOrderDetails } from '../../../api/userApi'
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js"
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-kit-react/views/userDashboardPage.js";

const useStyles = makeStyles(styles)

export default function UserPurchaseHistory() {
    const classes = useStyles()
    // initialize state values
    const [values, setValues] = useState({
        orderCreated: '',
        products: [],
        error: '',
    })
    // deconstruct variables from values object
    const { orderCreated, products, error } = values
    // get authenticated user id and auth token while making sure user is indeed authenticated first
    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token
    // get order id from parameters of route
    const { orderId } = useParams()
            
    const init = (userId, orderId, token) => {
        getOrderDetails(userId, orderId, token).then(res => {
            setValues({ ...values, orderCreated: res.data.createdAt, products: res.data.products, error: '' })
        }).catch(error => {
            console.log(error)
            setValues({ ...values, error: 'Error getting order details' })
        })
    }
        
    useEffect(() => {
        init(userId, orderId, token)
    }, [])
    
    const showError = () => {
        return error && (
            <SnackbarContent
            message={
                <span>
                {error}
                </span>
            }
            close
            color="danger"
            icon="info_outline"
            />
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
                height: 400,
                color: "white"
                }}
            />
            <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={6} md={4} className={classes.purchaseItem}>
                            <Card>
                                {showError()}
                                <CardHeader color="info" className={classes.cardHeader}>
                                    <h4>Order #{orderId}</h4>
                                </CardHeader>
                                <CardBody>
                                    <TableContainer component={Paper}>
                                        <Table className={classes.table}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Product Name</TableCell>
                                                    <TableCell>Product Quantity</TableCell>
                                                    <TableCell>Product Price</TableCell>
                                                    <TableCell>Date Purchased</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {products.map((product, i) => (
                                                    <TableRow key={i}>
                                                        <TableCell>{product.name}</TableCell>
                                                        <TableCell>{product.count}</TableCell>
                                                        <TableCell>${product.price}</TableCell>
                                                        <TableCell>{new Date(orderCreated).toLocaleDateString()}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </CardBody>
                            </Card>
                        </GridItem> 
                    </GridContainer>
                </div>
            </div>
        </div>
    )
}

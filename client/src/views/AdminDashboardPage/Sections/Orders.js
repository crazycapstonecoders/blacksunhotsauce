import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../../api/authApi'
import { getOrders, getStatusValues, updateOrderStatus } from '../../../api/adminApi'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js"

import styles from "assets/jss/material-kit-react/views/adminDashboardPage.js";

const useStyles = makeStyles(styles, (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}))

export default function Orders() {
    const classes = useStyles()        
    // initialize state values
    const [values, setValues] = useState({
        orders: [],
        error: '',
    })
    const [statusValues, setStatusValues] = useState([])
    // deconstruct variables from values object
    const { orders, error } = values
    // get authenticated user id and auth token while making sure user is indeed authenticated first
    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const loadOrders = () => {
        getOrders(userId, token).then(res => {
            setValues({ ...values, orders: res.data, error: '' })
        }).catch(error => {
            setValues({ ...values, error: error.response.data.error })
        })
    }

    const loadStatusValues = () => {
        getStatusValues(userId, token).then(res => {
            setStatusValues(res.data)
        }).catch(error => { 
            setValues({ ...values, error: error.response.data.error })
        })
    }

    useEffect(() => {
        loadOrders()
        loadStatusValues()
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

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(userId, token, orderId, e.target.value).then(res => {
            loadOrders()
        }).catch(error => {
            setValues({ ...values, error: error.response.data.error })
        })
    }

    const showStatus = order => (
        <FormControl className={classes.formControl}>
            <Select
            value={order.status}
            onChange={(e) => handleStatusChange(e, order._id)}
            >
                {statusValues.map((status, i) => (
                    <MenuItem key={i} value={status}>{status}</MenuItem>
                ))}
            </Select>
            <FormHelperText>Status: {order.status}</FormHelperText>
        </FormControl>
    )

    const noOrders = orders => {
        return orders.length < 1 ? <h4 style={{ textAlign: 'center' }}>No orders</h4> : null
    }

    return (
        <Card>
        {showError()}
        {noOrders(orders)}
            <CardHeader color="info" className={classes.cardHeader}>
                <h4>Total Orders: {orders.length}</h4>
            </CardHeader>
            <CardBody>
                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order #</TableCell>
                                <TableCell>Created</TableCell>
                                <TableCell>Manage Order Status</TableCell>
                                <TableCell>Customer Name</TableCell>
                                <TableCell>Shipping Address</TableCell>
                                <TableCell>Total Products</TableCell>
                                <TableCell>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order, i) => (
                                <TableRow key={i}>
                                    <TableCell component="th" scope="row">
                                        <Link to={`/user/${order.user._id}/${order._id}`}>{order._id}</Link>
                                    </TableCell>
                                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>{showStatus(order)}</TableCell>
                                    <TableCell>{order.user.name}</TableCell>
                                    <TableCell>{order.address}</TableCell>
                                    <TableCell>{order.products.length}</TableCell>
                                    <TableCell>${order.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardBody>
        </Card>
    )
}

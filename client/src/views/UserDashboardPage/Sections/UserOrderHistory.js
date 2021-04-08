import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../../api/authApi'
import { getOrderHistory } from '../../../api/userApi'
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
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js"

import styles from "assets/jss/material-kit-react/views/userDashboardPage.js";

const useStyles = makeStyles(styles)

export default function UserOrderHistory() {
    const classes = useStyles()
        // initialize state values
        const [values, setValues] = useState({
            purchaseHistory: [],
            error: '',
        })
        // deconstruct variables from values object
        const { purchaseHistory, error } = values
        // get authenticated user id and auth token while making sure user is indeed authenticated first
        const userId = isAuthenticated() && isAuthenticated().user._id
        const token = isAuthenticated() && isAuthenticated().token
        
        const init = (userId, token) => {
            getOrderHistory(userId, token).then(res => {
                setValues({ ...values, purchaseHistory: res.data, error: '' })
                // setValues({ ...values, purchaseHistory: res.data.history })
            }).catch(error => {
                setValues({ ...values, error: error.response.data.error })
            })
        }
    
        useEffect(() => {
            init(userId, token)
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
        <Card>
            {showError()}
            <CardHeader color="info" className={classes.cardHeader}>
                <h4>Order History</h4>
            </CardHeader>
            <CardBody>
                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order #</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {purchaseHistory.map((ph, i) => (
                                <TableRow key={i}>
                                    <TableCell component="th" scope="row">
                                        <Link to={`/user/${userId}/${ph._id}`}>{ph._id}</Link>
                                    </TableCell>
                                    <TableCell>{new Date(ph.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>{ph.status}</TableCell>
                                    <TableCell>${ph.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardBody>
        </Card>
    )
}

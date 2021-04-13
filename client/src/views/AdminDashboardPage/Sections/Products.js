import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../../api/authApi'
import { getProducts } from '../../../api/coreApi' 
import { removeProduct } from '../../../api/adminApi'
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
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/adminDashboardPage.js";

const useStyles = makeStyles(styles)

export default function Products() {
    const classes = useStyles()        
    const [products, setProducts] = useState([])
    const [error, setError] = useState('')
    const { user, token } = isAuthenticated()

    const loadProducts = () => {
        getProducts().then(res => {
            setProducts(res.data)
        }).catch(error => {
            setError(error)
        })
    }

    const deleteProduct = productId => {
        removeProduct(productId, user._id, token).then(res => {
            // after deleting, re-load products to display updated info
            loadProducts()
        }).catch(error => {
            setError(error.response.data.error)
        })
    }

    useEffect(() => {
        loadProducts()
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
                <h4>Total Products: {products.length}</h4>
            </CardHeader>
            <CardBody>
                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product #</TableCell>
                                <TableCell>Created</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>No. Sold</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product, i) => (
                                <TableRow key={i}>
                                    <TableCell component="th" scope="row">{product._id}</TableCell>
                                    <TableCell>{new Date(product.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>{product.sold}</TableCell>
                                    <TableCell>
                                            <Button color="rose" to={`/admin/product/update/${product._id}`} component={Link}>Update</Button>
                                            <hr />
                                            <Button color="danger" onClick={() => deleteProduct(product._id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardBody>
        </Card>
    )
}

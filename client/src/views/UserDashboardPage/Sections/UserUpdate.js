import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../../api/authApi'
import { read, update, updatedUser } from '../../../api/userApi'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/lab components
import { Alert } from '@material-ui/lab'
// @material-ui/icons
import People from "@material-ui/icons/People";
import Email from "@material-ui/icons/Email";
// core components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/userDashboardPage.js";

const useStyles = makeStyles(styles);

export default function UserUpdate() {
    const classes = useStyles()
    // initialize state values
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        error: '',
        success: false,
    })
    // deconstruct variables from values object
    const { name, email, password, role, error, success } = values
    // get authenticated user id and auth token while making sure user is indeed authenticated first
    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const init = userId => {
        read(userId, token).then(res => {
            setValues({ ...values, name: res.data.name, email: res.data.email, role: res.data.role })
        }).catch(error => {
            setValues({ ...values, error: error.response.data.error })
        })
    }

    useEffect(() => {
        init(userId)
    }, [])

    // higher order function to target name and event of form
    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value })
    }

    const handleSubmit = e => {
        // prevent default page refresh on frontend
        e.preventDefault()
        update(userId, token, { name, password }).then(res => {
            updatedUser(res.data, () => {
                setValues({ ...values, name: res.data.name, password: '', success: true })
            })
        }).catch(error => {
            setValues({ ...values, error: error.response.data.error })
        })
    }

    const closeError = () => {
        setValues({ ...values, error: '' })
    }

    const closeSuccess = () => {
        setValues({ ...values, success: false })
    }

    const showError = () => (
        <Alert onClose={closeError} severity="error" style={{ display: error ? '' : 'none' }}>
            {error}
        </Alert>
    )

    const showSuccess = () => (
        <Alert onClose={closeSuccess} severity="success" style={{ display: success ? '' : 'none' }}>
            Success! User updated
        </Alert>
    )

    return (
        <Card>
            <form className={classes.form} onSubmit={handleSubmit}>
                <CardHeader color="info" className={classes.cardHeader}>
                    <h4>User Information</h4>
                </CardHeader>
                {showError()}
                {showSuccess()}
                <CardBody>
                    <CustomInput
                        labelText="Name"
                        id="name"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: handleChange('name'),
                            value: name,
                            type: "text",
                            endAdornment: (
                                <InputAdornment position="end">
                                    <People className={classes.inputIconsColor} />
                                </InputAdornment>
                            )
                        }}
                    />
                    <CustomInput
                        labelText="Email"
                        id="email"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            value: email,
                            disabled: true,
                            type: "email",
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Email className={classes.inputIconsColor} />
                                </InputAdornment>
                            )
                        }}
                    />
                    <CustomInput
                        labelText="Update password here"
                        id="password"
                        formControlProps={{
                            fullWidth: true
                        }}
                        inputProps={{
                            onChange: handleChange('password'),
                            type: "password",
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Icon className={classes.inputIconsColor}>
                                        lock_outline
                            </Icon>
                                </InputAdornment>
                            ),
                            autoComplete: "off"
                        }}
                    />
                    <h5>{role === 1 ? 'Admin' : 'Registered User'}</h5>
                    <hr />
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                    <Button round color="rose" onClick={handleSubmit}>
                        Update Info
                </Button>
                    <hr />
                    <Button color="info" to='/cart' component={Link}>
                        View Cart
                </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

import React from 'react'
import { Redirect } from 'react-router-dom'
import { isAuthenticated } from '../../api/authApi'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

// import styles from "assets/jss/material-kit-react/views/loginPage.js";

// import image from "assets/img/bg7.jpg";

// const useStyles = makeStyles(styles);

export default function UserDashboardPage(props) {
    // const classes = useStyles()
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
            <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
            <h1>This is the user dashboard</h1>
        </div>
    )
}

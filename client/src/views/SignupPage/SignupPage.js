import React, { useState } from "react"
import { Link } from 'react-router-dom'
import { signup, validateRecaptcha } from '../../api/authApi'
import ReCAPTCHA from 'react-google-recaptcha'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js"

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/parallax.png";

const useStyles = makeStyles(styles);

export default function SigninPage() {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  // initialize state values
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
    recaptcha: false
  })
  // deconstruct variables from values object
  const { name, email, password, error, success, recaptcha } = values

  // higher order function to target name and event of form
  const handleChange = name => e => {
    setValues({ ...values, success: false, [name]: e.target.value })
  }

  const handleCaptcha = value => {
    validateRecaptcha(value).then(res => {
      setValues({ ...values, recaptcha: true })
    }).catch(error => {
      setValues({ ...values, recaptcha: false, error: 'Error validating recaptcha' })
    })
  }

  const handleSubmit = e => {
    // prevent default page refresh on frontend
    e.preventDefault()
    setValues({ ...values, error: false })
    // define user object with form values
    const user = { name, email, password }
    if(recaptcha) {
      // sign up with user
      signup(user).then(res => {
        setValues({ ...values, name: '', email: '', password: '', error: '', success: true })
      }).catch(error => {
          setValues({ ...values, error: error.response.data.error, success: false })
      })
    } else {
      setValues({ ...values, error: 'Please validate recaptcha' })
    }
  }

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

  const showSuccess = () => {
    return success && (
        <SnackbarContent
        message={
        <span>
            Success! User created. Please <Link to="/signin">Sign In</Link>
        </span>
        }
        close
        color="success"
        icon={Check}
        />
    )
  }

  return (
    <div>
      <Header
        absolute
        color="transparent"
        rightLinks={<HeaderLinks />}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Sign Up</h4>
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
                        onChange: handleChange('email'),
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Password"
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
                      <div style={{ textAlign: 'center' }}>
                        <Button simple color="primary" size="lg" onClick={handleSubmit}>
                          Sign Up
                        </Button>
                      </div>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Link to="/signin" variant="body2">
                      {"Already have an account? Sign In"}
                    </Link>
                  </CardFooter>
                </form>
              </Card>
              <ReCAPTCHA sitekey='6Leg7WgaAAAAAMq4FlSvK6xqsr_2L2UHDCKncX21' onChange={handleCaptcha} />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

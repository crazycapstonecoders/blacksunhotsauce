import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom'
import { signin, authenticate, isAuthenticated, validateRecaptcha } from '../../api/authApi'
import ReCAPTCHA from 'react-google-recaptcha'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import { CircularProgress } from '@material-ui/core'
// @material-ui/lab components
import { Alert } from '@material-ui/lab'
// @material-ui/icons
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

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function SigninPage(props) {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  // initialize state values
  const [values, setValues] = useState({
    username: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferer: false,
    recaptcha: false
  })
  // deconstruct variables from values object
  const { username, password, error, loading, redirectToReferer, recaptcha } = values

  // higher order function to target name and event of form
  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value })
  }

  const handleCaptcha = value => {
    validateRecaptcha(value).then(res => {
      setValues({ ...values, recaptcha: res.data.success })
    }).catch(error => {
      setValues({ ...values, recaptcha: false, error: 'Error validating recaptcha' })
    })
  }

  const handleSubmit = e => {
    // prevent default page refresh on frontend
    e.preventDefault()
    setValues({ ...values, error: false, loading: true })
    if (recaptcha) {
      // sign in with form values
      signin({ username, password }).then(res => {
        // authenticate user by setting jwt and user object
        authenticate(res, () => {
          setValues({ ...values, redirectToReferer: true })
        })
      }).catch(error => {
        setValues({ ...values, error: error.response.data.error, loading: false })
      })
    } else {
      setValues({ ...values, error: 'Please validate recaptcha' })
    }
  }

  const showError = () => (
    <Alert severity="error" style={{ display: error ? '' : 'none' }}>
      {error}
    </Alert>
  )

  const showLoading = () => (
    <CircularProgress style={{ display: loading ? '' : 'none' }} />
  )

  const redirectUser = () => {
    if (redirectToReferer) {
      if (isAuthenticated()) {
        return <Redirect to='/admin/dashboard' />
      }
    }
  }

  return (
    <div>
      <Header
        absolute
        color="transparent"
        rightLinks={<HeaderLinks />}
        {...rest}
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
                    <h4>Sign In</h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                    </div>
                  </CardHeader>
                  {showError()}
                  {showLoading()}
                  <p className={classes.divider}>Or</p>
                  <CardBody>
                    <CustomInput
                      labelText="Username"
                      id="username"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: handleChange('username'),
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
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
                        Sign In
                      </Button>
                      <Button simple color="danger" size="lg" to='/forgot-password' component={Link}>
                        Forgot Password
                      </Button>
                    </div>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Link to="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </CardFooter>
                </form>
              </Card>
              <ReCAPTCHA sitekey='6Leg7WgaAAAAAMq4FlSvK6xqsr_2L2UHDCKncX21' onChange={handleCaptcha} />
            </GridItem>
          </GridContainer>
        </div>
        {redirectUser()}
      </div>
    </div>
  );
}

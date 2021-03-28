import React, { useState } from "react";
import { resetPassword, validateRecaptcha } from '../../api/authApi'
import { useParams } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/lab components
import { Alert } from '@material-ui/lab'
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

export default function ResetPasswordPage(props) {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  // initialize state values 
  const [values, setValues] = useState({
    newPassword: '',
    message: '',
    error: '',
    recaptcha: false
  })
  // deconstruct variables from values object
  const { newPassword, message, error, recaptcha } = values
  // get reset password token from request parameters
  const { resetPasswordToken } = useParams()

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
    setValues({ ...values, message: '', error: '' })
    if (recaptcha) {
      // reset password using new password and reset password link
      resetPassword({ newPassword, resetPasswordLink: resetPasswordToken }).then(res => {
        setValues({ ...values, message: res.data.message, error: '' })
      }).catch(error => {
        setValues({ ...values, message: '', error: error.response.data.error })
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

  const showMessage = () => (
    <Alert severity="success" style={{ display: message ? '' : 'none' }}>
      {message}
    </Alert>
  )

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
                    <h4>Reset Password</h4>
                  </CardHeader>
                  {showError()}
                  {showMessage()}
                  <CardBody>
                    <CustomInput
                      labelText="New Password"
                      id="newPassword"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: handleChange('newPassword'),
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
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" onClick={handleSubmit}>
                      Submit
                    </Button>
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

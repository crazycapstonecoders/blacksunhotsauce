import React, { useState } from "react"
import { mailToAdmin } from '../../../api/coreApi'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js"

import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";

const useStyles = makeStyles(styles);

export default function WorkSection() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: '',
    error: '',
    success: ''
  })
  const classes = useStyles()
  const { name, email, message, error, success } = values

  const handleChange = name => e => {
    setValues({ ...values, success: false, [name]: e.target.value })
  }

  const handleSubmit = e => {
    // prevent default page refresh on frontend
    e.preventDefault()
    setValues({ ...values, error: false })
    mailToAdmin({ values }).then(res => {
      setValues({ ...values, name: '', email: '', message: '', error: '', success: res.data.message })
    }).catch(error => {
      setValues({ ...values, error: error.response.data.error, success: '' })
    })
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
            {success}
          </span>
        }
        close
        color="success"
        icon={Check}
        />
    )
  }

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Get in touch</h2>
          <h4 className={classes.description}>
            Please do not hesitate to contact us if you have any questions.<br></br>
            Thank you!
          </h4>
          {showError()}
          {showSuccess()}
          <form className={classes.form} onSubmit={handleSubmit}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Name"
                  id="name"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: handleChange('name'),
                    value: name,
                    type: 'text'
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: handleChange('email'),
                    value: email,
                    type: 'email'
                  }}
                />
              </GridItem>
              <CustomInput
                labelText="Your Message"
                id="message"
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea
                }}
                inputProps={{
                  onChange: handleChange('message'),
                  value: message,
                  type: 'text',
                  multiline: true,
                  rows: 5
                }}
              />
              <GridItem xs={12} sm={12} md={4}>
                <Button color="primary" onClick={handleSubmit}>Send Message</Button>
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}

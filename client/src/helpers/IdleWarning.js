import React, { useState, forwardRef } from 'react'
import { signout } from '../api/authApi'
import useAutoSignout from './useAutoSignout'
import { withRouter } from 'react-router-dom'
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// material-ui components
import makeStyles from "@material-ui/core/styles/makeStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Button from "components/CustomButtons/Button.js";

import modalStyle from "assets/jss/material-kit-react/modalStyle.js";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(modalStyle);

function IdleWarning({ history }) {
  const classes = useStyles();
  const [modal, setModal] = useState(true)
  // timer is set to 900s which is 15mins 
  const timer = useAutoSignout(900)

  if(timer === 0) {
    return signout(() => { history.push('/') })
  } 

  if(timer < 15) {
    return (
      <div>
        <Dialog
          classes={{
          root: classes.center,
          paper: classes.modal
          }}
          open={true}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setModal(false)}
          aria-labelledby="modal-slide-title"
          aria-describedby="modal-slide-description"
        >
          <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
          >
            <IconButton
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={() => setModal(false)}
            >
              <Close className={classes.modalClose} />
            </IconButton>
              <h4 className={classes.modalTitle}>Warning</h4>
          </DialogTitle>
            <DialogContent
            id="modal-slide-description"
            className={classes.modalBody}
            >
              <h5>In {timer} seconds you will be automatically logged out.</h5>
            </DialogContent>
            <DialogActions
            className={classes.modalFooter + " " + classes.modalFooterCenter}
            >
              <Button onClick={() => setModal(false)} color='success'>Stay</Button>
              <Button onClick={() => signout(() => { history.push('/') })} color='danger'>Sign Out</Button>
            </DialogActions>
        </Dialog>
      </div>
    )
  }
  return (
    <div></div>
  )
}

export default withRouter(IdleWarning)

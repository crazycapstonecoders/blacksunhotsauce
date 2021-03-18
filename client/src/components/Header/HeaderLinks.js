import React from "react";
import { isAuthenticated, signout } from '../../api/authApi'
// react components for routing our app without refresh
import { Link, withRouter } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

function HeaderLinks({ history }) {
  const classes = useStyles();

  // custom styling to highlight color of header link when path is active
  const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: '#00FFFF' }
  }

  return (
    <div>
      {/* Ternary operator to display header links based on whether user is quthenticated or not */}
      {isAuthenticated() ? 
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <Link className={classes.navLink} style={isActive(history, '/user/dashboard')} to="/user/dashboard">User Dashboard</Link>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Link className={classes.navLink} style={isActive(history, '/admin/dashboard')} to="/admin/dashboard">Admin Dashboard</Link>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Link className={classes.navLink} style={isActive(history, '/shop')} to="/shop">Shop</Link>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Link className={classes.navLink} style={isActive(history, '/cart')} to="/cart">Cart</Link>
        </ListItem>
        <ListItem className={classes.listItem}>
        <Button
          color="danger"
          className={classes.navLink}
          onClick={() => signout(() => { history.push('/') })}
        >
          Sign Out
        </Button>
      </ListItem>
      </List>
      :
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <Button
            to="/signin"
            color="transparent"
            className={classes.navLink}
            component={Link}
            style={isActive(history, '/signin')}
          >
            Sign In
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            to="/signup"
            color="transparent"
            className={classes.navLink}
            component={Link}
            style={isActive(history, '/signup')}
          >
            Sign Up
          </Button>
        </ListItem>
      </List>
      }
    </div>
  );
}

export default withRouter(HeaderLinks)

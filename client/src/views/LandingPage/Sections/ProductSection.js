import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/TrendingUp";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/StoreOutlined";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Let{"'"}s talk hot sauce</h2>
          <h5 className={classes.description}>
            All Blacksun Hot Sauces are made in a small batch, one gallon at a time process.
            Using ingredients grown locally and others purchased from around the world, our
            hot sauces come in a variety of unique flavors. Ranging in hotness, we offer the
            exact flavor you need to spice up your meals.

             <p className={classes.description}>
                 <a href="shop">Browse The Shop</a>.
                </p>        
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="We are growing!"
              description="Currently we sell individual bottles of our amazing hot sauce, but will be adding bulk purchase of larger quantities. Resteraunt owners stay tuned!"
              icon={Chat}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Secure Sign up"
              description="Please create an account with our secure sign in and easily access our current selction of sauces."
              icon={VerifiedUser}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Online Ordering"
              description="Welcome to our store! With no storefront location, we have relied on word of mouth and in person sales. With this online store, our firey sauces are just a click away!"
              icon={Fingerprint}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

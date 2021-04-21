import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import team1 from "assets/img/faces/logosquare.jpg";
import team2 from "assets/img/faces/louiesquare.png";
import team3 from "assets/img/faces/peppersquare.jpg";

import ShopPage from "views/ShopPage/ShopPage.js";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>A little bit more about us</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={10} md={6} className={classes.itemGrid}>
                <img src={team1} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Blacksun Hot Sauce
                <br />
                <small className={classes.smallTitle}>Current Logo</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  We are in the process of reimgaining our logo with an
                  updated design and product description. We are always
                  creating new sauces, check the shop for
                   our current <a href="shop">products</a>.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                  href="https://www.facebook.com/"
                  target="_blank"
                >
                  <i className={classes.socials + " fab fa-facebook"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team2} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Louie
                <br />
                <small className={classes.smallTitle}>Mascot</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  Louie, an Australian Cattle Dog, is our mascot.
                  Known for driving cattle through the harsh envirorment of the Australian
                  Outback, he knows a thing or two about heat.                 
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
              <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                  href="https://www.instagram.com/"
                  target="_blank"
                >
                  <i className={classes.socials + " fab fa-instagram"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team3} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Top Quality Ingredients
                <br />
                <small className={classes.smallTitle}>How it{"'"}s made</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  At Blacksun Hot Sauce we work hard to grown and purchase only the
                  best inredients for our deliscious sauces. Many ingredients are grown
                  in our own gardens, or purchased from local suppliers here in Cincinnati. 
                  For some of our more exotic creations, we purchased the best available peppers 
                  from all around the country, and the world.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

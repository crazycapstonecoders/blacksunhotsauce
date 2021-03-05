import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";
import AdminDashboardPage from "views/AdminDashboardPage/AdminDashboardPage.js";
import UserDashboardPage from "views/UserDashboardPage/UserDashboardPage.js";
import SigninPage from "views/SigninPage/SigninPage.js";
import SignupPage from "views/SignupPage/SignupPage.js";
import ShopPage from "views/ShopPage/ShopPage.js";
import CartPage from "views/CartPage/CartPage.js";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/signup" component={SignupPage} />
      <Route path="/signin" component={SigninPage} />
      <Route path="/shop" component={ShopPage} />
      <Route path="/cart" component={CartPage} />
      <Route path="/admin/dashboard" component={AdminDashboardPage} />
      <Route path="/user/dashboard" component={UserDashboardPage} />
      <Route path="/" component={LandingPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

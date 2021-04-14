import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";
import AdminDashboardPage from "views/AdminDashboardPage/AdminDashboardPage.js";
import UpdateProduct from "views/AdminDashboardPage/Sections/UpdateProduct";
import UserDashboardPage from "views/UserDashboardPage/UserDashboardPage.js";
import UserPurchaseHistory from "views/UserDashboardPage/Sections/UserPurchaseHistory.js";
import SigninPage from "views/SigninPage/SigninPage.js";
import SignupPage from "views/SignupPage/SignupPage.js";
import ShopPage from "views/ShopPage/ShopPage.js";
import CartPage from "views/CartPage/CartPage.js";
import ForgotPasswordPage from "views/ForgotPasswordPage/ForgotPasswordPage.js";
import ResetPasswordPage from "views/ResetPasswordPage/ResetPasswordPage.js";
import PrivateRoute from "auth/PrivateRoute.js"
import AdminRoute from "auth/AdminRoute.js"


const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/signup" component={SignupPage} />
      <Route path="/signin" component={SigninPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
      <Route path="/reset-password/:resetPasswordToken" component={ResetPasswordPage} />
      <Route path="/shop" component={ShopPage} />
      <Route path="/cart" component={CartPage} />
      <AdminRoute path="/admin/product/update/:productId" component={UpdateProduct} />
      <AdminRoute path="/admin/dashboard" component={AdminDashboardPage} />
      <PrivateRoute path="/user/:userId/:orderId" component={UserPurchaseHistory} />
      <PrivateRoute path="/user/dashboard" component={UserDashboardPage} />
      <Route path="/" component={LandingPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

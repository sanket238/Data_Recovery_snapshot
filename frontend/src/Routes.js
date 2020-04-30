import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignIn from "./components/containers/SignIn/SignIn";
import SignUp from "./components/containers/SignUp/SignUp";
import ForgotPassword from "./components/containers/ForgotPassword/ForgotPassword";
import App from "./App";

function Routes() {
  window.addEventListener("storage", (e) => {
    if (!localStorage.getItem("username")) {
      window.location.reload();
    }
  });
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgot-password" component={ForgotPassword} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;

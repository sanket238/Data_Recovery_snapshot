import React from "react";
import { Route } from "react-router-dom";
import SignIn from "./components/containers/SignIn/SignIn";
import Home from "./components/containers/Home/Home";

function App() {
  let isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <Route>
      {isLoggedIn === null || isLoggedIn === false ? <SignIn /> : <Home />}
    </Route>
  );
}

export default App;

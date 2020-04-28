import React from "react";
import { Route } from "react-router-dom";
import SignIn from "./components/containers/SignIn/SignIn";
import Dashboard from "./components/containers/Dashboard/Dashboard";

function App() {
  let isLoggedIn = localStorage.getItem("username");

  return <Route>{isLoggedIn === null ? <SignIn /> : <Dashboard />}</Route>;
}

export default App;

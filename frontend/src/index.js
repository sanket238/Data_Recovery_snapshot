import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Routes from "./Routes";
import { Provider } from "react-redux";
import configureStore from "./redux/store/configureStore";
require("dotenv").config();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#222a44"
    },
    secondary: {
      main: "#dc094e"
    }
  }
});

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

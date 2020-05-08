import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  Card
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link, withRouter, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import "./SignUp.css";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}

      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  container: {
    height: "100vh",
    justifyContent: "center",
    flexDirection: "column",
    display: "flex"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  card: {
    margin: theme.spacing(-5),
    padding: theme.spacing(5)
  }
}));

const SignUp = props => {
  const [inputs, setInputs] = useState({});
  const [validatePassword, setValidatePassword] = useState(false);
  const [data, setData] = useState({});

  const handleChange = e => {
    if (e.target.name === "password" && validatePassword) {
      if (e.target.value.length > 7) {
        setValidatePassword(false);
      }
    }
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const classes = useStyles();

  const onRegister = e => {
    e.preventDefault();
    if (inputs.password.length < 8) {
      setValidatePassword(true);
    } else {
      let name = inputs.fullname;
      let username = inputs.username;
      let email = inputs.email;
      let password = inputs.password;

      const data = {
        name,
        username,
        email,
        password
      };

      fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/user/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          setData(data);
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
  };

  let isSuccess =
    Object.keys(data).length > 0 && typeof data.id !== "undefined";

  return !isSuccess ? (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.container + " signup-card"}>
        <Card className={"signup-card-margin"}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form onSubmit={onRegister} className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="fname"
                    name="username"
                    variant="outlined"
                    onChange={handleChange}
                    required
                    fullWidth
                    id="userName"
                    label="Username"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    onChange={handleChange}
                    required
                    fullWidth
                    id="name"
                    label="Full name"
                    name="fullname"
                    autoComplete="fname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    onChange={handleChange}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={validatePassword}
                    variant="outlined"
                    onChange={handleChange}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  {validatePassword && (
                    <div style={{ color: "#dc094e", marginTop: 5 }}>
                      Password should contains at lease 8 characters.
                    </div>
                  )}
                  {Object.keys(data).length > 0 &&
                  typeof data.id === "undefined" ? (
                    <div
                      style={{
                        fontSize: 16,
                        textAlign: "center",
                        marginTop: 20,
                        color: "#dc094e",
                        fontWeight: "bold",
                        borderRadius: 5,
                        background: "#fef0f5",
                        border: "2px solid #dc094e",
                        padding: 15
                      }}
                    >
                      There was a problem
                    </div>
                  ) : null}
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I accept the terms & conditions."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Typography variant="body2">
                    Already have an account? <Link to="/signin">Sign in</Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </div>

          <Box mt={5}>
            <Copyright />
          </Box>
        </Card>
      </div>
    </Container>
  ) : (
    <Redirect to="/signin" />
  );
};

export default withRouter(connect()(SignUp));

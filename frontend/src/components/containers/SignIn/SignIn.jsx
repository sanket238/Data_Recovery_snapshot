import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Grid,
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  Button,
  Avatar,
  Card
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { Link, withRouter } from "react-router-dom";
import "./SignIn.css";

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
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  card: {
    padding: theme.spacing(5)
  }
}));

const SignIn = props => {
  const classes = useStyles();
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(false);
  const [validatePassword, setValidatePassword] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleChange = e => {
    setError(false);
    if (e.target.name === "password" && validatePassword) {
      if (e.target.value.length > 7) {
        setValidatePassword(false);
      }
    }
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onLogin = e => {
    e.preventDefault();

    if (inputs.password.length < 8) {
      setValidatePassword(true);
    } else {
      let username = inputs.username;
      let password = inputs.password;
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/user/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(username + ":" + password)
        }
      })
        .then(response => response.json())
        .then(data => {
          if (typeof data.detail !== "undefined") {
            setError(true);
          } else {
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("name", data.name);
            localStorage.setItem("token", data.token);
            props.history.push("/");
          }
        })
        .catch(error => {
          setError(true);
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.container + " signin-card"}>
        <Card className={"signin-card-margin"}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form onSubmit={onLogin} className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                onChange={handleChange}
                id="username"
                label="Username"
                name="username"
                autoComplete="user"
                autoFocus
              />
              <TextField
                error={validatePassword}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                onChange={handleChange}
                name="password"
                label="Password"
                type={visible ? "text" : "password"}
                id="password"
                autoComplete="current-password"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: -65,
                  zIndex: 1,
                  padding: 20
                }}
              >
                {!visible ? (
                  <VisibilityIcon
                    onClick={() => setVisible(true)}
                    style={{ zIndex: 1, cursor: "pointer" }}
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() => setVisible(false)}
                    style={{ zIndex: 1, cursor: "pointer" }}
                  />
                )}
              </div>
              {validatePassword && (
                <div style={{ color: "#dc094e" }}>
                  Password should contains at lease 8 characters.
                </div>
              )}

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {error ? (
                <div
                  style={{
                    fontSize: 16,
                    textAlign: "center",
                    color: "#dc094e",
                    fontWeight: "bold",
                    borderRadius: 5,
                    background: "#fef0f5",
                    border: "2px solid #dc094e",
                    padding: 15
                  }}
                >
                  Invalid Email or Password
                </div>
              ) : null}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </div>

          <Box mt={8}>
            <Copyright />
          </Box>
        </Card>
      </div>
    </Container>
  );
};

export default withRouter(SignIn);

import React from "react";
import {
  Badge,
  Avatar,
  Grid,
  Paper,
  TextField,
  Button,
  Dialog
} from "@material-ui/core";
import { Edit, CheckCircle, ErrorOutline } from "@material-ui/icons";
import { withRouter } from "react-router-dom";
import { useState } from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import ProfileIcon from "../../../assets/profileicon.svg";

const Profile = props => {
  const [edit, setEdit] = useState(false);
  const [showEdit, setShowEdit] = useState(0);
  const [inputs, setInputs] = useState({});
  const [open, setOpen] = useState(false);
  const [operation, setOperation] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/user/profile/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        setData([]);
      });
  }, []);

  const updateProfile = obj => {
    const data = { [obj]: inputs[obj] };
    setError(false);

    fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/user/profile/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        if (obj !== "name") {
          localStorage.clear();
        }
        setError(false);
        handleClick();
        setData(data);
      })
      .catch(error => {
        setError(true);
        console.error("Error:", error);
      });
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const renderForm = () => {
    switch (showEdit) {
      case 1:
        return (
          <div style={{ padding: 20, fontSize: 18 }}>
            <div
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 30
              }}
            >
              Update Username
            </div>
            <div style={{ marginBottom: 30, textAlign: "center" }}>
              <TextField
                size="small"
                placeholder="Name"
                id="outlined-basic"
                onChange={handleChange}
                defaultValue={data.username}
                label="Name"
                name="username"
                variant="outlined"
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <Button
                onClick={() => {
                  setEdit(false);
                  setInputs({});
                  setShowEdit(0);
                }}
                style={{ margin: 10 }}
                type="button"
                variant="contained"
                color="primary"
              >
                Cancel
              </Button>
              <Button
                type="button"
                style={{ margin: 10 }}
                variant="contained"
                color="primary"
                onClick={() => {
                  updateProfile("username");
                  setOperation("Username");
                }}
              >
                Update
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div style={{ padding: 20, fontSize: 18 }}>
            <div
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 30
              }}
            >
              Update Name
            </div>
            <div style={{ marginBottom: 30, textAlign: "center" }}>
              <TextField
                size="small"
                placeholder="Name"
                id="outlined-basic"
                onChange={handleChange}
                defaultValue={data.name}
                label="Name"
                name="name"
                variant="outlined"
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <Button
                onClick={() => {
                  setEdit(false);
                  setInputs({});
                  setShowEdit(0);
                }}
                style={{ margin: 10 }}
                type="button"
                variant="contained"
                color="primary"
              >
                Cancel
              </Button>
              <Button
                type="button"
                style={{ margin: 10 }}
                variant="contained"
                color="primary"
                onClick={() => {
                  updateProfile("name");
                  setOperation("Name");
                }}
              >
                Update
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div style={{ padding: 20, fontSize: 18 }}>
            <div
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 30
              }}
            >
              Update Email
            </div>
            <div style={{ marginBottom: 30, textAlign: "center" }}>
              <TextField
                size="small"
                placeholder="g@email.com"
                id="outlined-basic"
                label="Email"
                onChange={handleChange}
                defaultValue={data.email}
                name="email"
                type="email"
                variant="outlined"
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <Button
                onClick={() => {
                  setEdit(false);
                  setInputs({});
                  setShowEdit(0);
                }}
                style={{ margin: 10 }}
                type="submit"
                variant="contained"
                color="primary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                style={{ margin: 10 }}
                variant="contained"
                color="primary"
                onClick={() => {
                  updateProfile("email");
                  setOperation("Email");
                }}
              >
                Update
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div style={{ padding: 20, fontSize: 18 }}>
            <div
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 30
              }}
            >
              Update Password
            </div>
            <div style={{ marginBottom: 30, textAlign: "center" }}>
              <TextField
                size="small"
                type={visible ? "text" : "password"}
                defaultValue="password"
                onChange={handleChange}
                name="password"
                id="outlined-basic"
                label="Password"
                variant="outlined"
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: -52,
                  zIndex: 1,
                  padding: "20px 85px"
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
            </div>
            <div style={{ textAlign: "center" }}>
              <Button
                onClick={() => {
                  setEdit(false);
                  setInputs({});
                  setShowEdit(0);
                }}
                style={{ margin: 10 }}
                type="submit"
                variant="contained"
                color="primary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                style={{ margin: 10 }}
                variant="contained"
                color="primary"
                onClick={() => {
                  updateProfile("password");
                  setOperation("Password");
                }}
              >
                Update
              </Button>
            </div>
          </div>
        );

      default:
        break;
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <Badge
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
        >
          <Avatar
            style={{ width: 200, height: 200 }}
            alt="User"
            src={ProfileIcon}
          />
        </Badge>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <Grid item xs={12} md={6} lg={4} sm={6}>
          <Paper>
            {!edit && (
              <Fragment>
                <div style={{ padding: 20, fontSize: 18 }}>
                  <label>
                    <span style={{ fontWeight: "bold" }}>Username:</span>{" "}
                    {data.username}
                    <span>
                      <Edit
                        onClick={() => {
                          setEdit(true);
                          setShowEdit(1);
                        }}
                        style={{
                          fontSize: 18,
                          marginLeft: 10,
                          marginBottom: -2,
                          cursor: "pointer"
                        }}
                        fontSize="small"
                      />
                    </span>
                  </label>
                  <br />
                  <label>
                    <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
                    {data.name}
                    <span>
                      <Edit
                        onClick={() => {
                          setEdit(true);
                          setShowEdit(2);
                        }}
                        style={{
                          fontSize: 18,
                          marginLeft: 10,
                          marginBottom: -2,
                          cursor: "pointer"
                        }}
                        fontSize="small"
                      />
                    </span>
                  </label>
                  <br />
                  <label>
                    <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
                    {data.email}
                    <span>
                      <Edit
                        onClick={() => {
                          setEdit(true);
                          setShowEdit(3);
                        }}
                        style={{
                          fontSize: 18,
                          marginLeft: 10,
                          marginBottom: -2,
                          cursor: "pointer"
                        }}
                        fontSize="small"
                      />
                    </span>
                  </label>
                  <br />
                </div>
                <div style={{ padding: 20, fontSize: 18 }}>
                  <label
                    onClick={() => {
                      setEdit(true);
                      setShowEdit(4);
                    }}
                    style={{ color: "blue", cursor: "pointer" }}
                  >
                    Update Password
                  </label>
                </div>
              </Fragment>
            )}
            {edit && renderForm()}
            <Dialog
              onClose={handleClose}
              disableBackdropClick={true}
              disableEscapeKeyDown={true}
              aria-labelledby="simple-dialog-title"
              open={open}
            >
              <div style={{ textAlign: "center" }}>
                <div>
                  {error === true ? (
                    <ErrorOutline
                      color="secondary"
                      style={{
                        fontSize: 100,
                        margin: "30px 70px"
                      }}
                    />
                  ) : (
                    <CheckCircle
                      style={{
                        color: "#32b93c",
                        fontSize: 100,
                        margin: "30px 70px"
                      }}
                    />
                  )}
                </div>
                {!error ? (
                  <label
                    style={{ fontWeight: "bold", fontSize: 16, padding: 30 }}
                  >
                    {operation === "Name"
                      ? operation + " Updated"
                      : operation + " Updated" + ", Please Signin again."}
                  </label>
                ) : (
                  <label
                    style={{ fontWeight: "bold", fontSize: 16, padding: 30 }}
                  >
                    There was a problem in updating {operation.toLowerCase()},
                    Please try again later.
                  </label>
                )}
                <div>
                  <div style={{ textAlign: "center", margin: "15px 0px" }}>
                    {operation !== "Name" && !error ? (
                      <Button
                        type="submit"
                        onClick={() => {
                          setEdit(false);
                          setInputs({});
                          props.history.push("/signin");
                          setShowEdit(0);
                        }}
                        style={{ margin: 10 }}
                        variant="contained"
                        color="primary"
                      >
                        Sign In
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        onClick={() => {
                          setEdit(false);
                          setInputs({});
                          setShowEdit(0);
                          setOpen(false);
                        }}
                        style={{ margin: 10 }}
                        variant="contained"
                        color="primary"
                      >
                        Close
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Dialog>
          </Paper>
        </Grid>
      </div>
    </div>
  );
};

export default withRouter(Profile);

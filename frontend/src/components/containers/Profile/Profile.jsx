import React from "react";
import {
  Badge,
  Avatar,
  Grid,
  Paper,
  TextField,
  Button
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { withRouter } from "react-router-dom";
import { useState } from "react";
import { Fragment } from "react";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [showEdit, setShowEdit] = useState(0);

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
              Update Name
            </div>
            <div style={{ marginBottom: 30, textAlign: "center" }}>
              <TextField
                size="small"
                defaultValue="Name"
                id="outlined-basic"
                label="Name"
                variant="outlined"
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <Button
                onClick={() => {
                  setEdit(false);
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
              Update Email
            </div>
            <div style={{ marginBottom: 30, textAlign: "center" }}>
              <TextField
                size="small"
                defaultValue="g@email.com"
                id="outlined-basic"
                label="Email"
                type="email"
                variant="outlined"
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <Button
                onClick={() => {
                  setEdit(false);
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
              Update Password
            </div>
            <div style={{ marginBottom: 30, textAlign: "center" }}>
              <TextField
                size="small"
                type="password"
                defaultValue="password"
                id="outlined-basic"
                label="Password"
                variant="outlined"
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <Button
                onClick={() => {
                  setEdit(false);
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
          badgeContent={
            <div className="image-upload">
              <label htmlFor="file-input">
                <Edit
                  style={{
                    marginLeft: -30,
                    background: "white",
                    borderRadius: 20,
                    border: "2px solid",
                    padding: 5,
                    cursor: "pointer"
                  }}
                  fontSize="large"
                  alt="Remy Sharp"
                />
              </label>
              <input style={{ display: "none" }} id="file-input" type="file" />
            </div>
          }
        >
          <Avatar
            style={{ width: 200, height: 200 }}
            alt="Travis Howard"
            src="/static/images/avatar/2.jpg"
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
                    <span style={{ fontWeight: "bold" }}>Name:</span> Mitesh
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
                    <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
                    mitesh@gmail.com
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
                </div>
                <div style={{ padding: 20, fontSize: 18 }}>
                  <label
                    onClick={() => {
                      setEdit(true);
                      setShowEdit(3);
                    }}
                    style={{ color: "blue", cursor: "pointer" }}
                  >
                    Update Password
                  </label>
                </div>
              </Fragment>
            )}
            {edit && renderForm()}
          </Paper>
        </Grid>
      </div>
    </div>
  );
};

export default withRouter(Profile);

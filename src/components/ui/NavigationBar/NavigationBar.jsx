import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
} from "@material-ui/core";
import {
  ExpandMore,
  NavigateNext,
  Folder,
  Image,
  DevicesOther,
  VideoLibrary,
  InsertDriveFile,
  Contacts,
  Person,
  ExitToApp,
  Home,
} from "@material-ui/icons";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  icon: {
    color: "#757575",
  },
  iconActive: {
    color: "#5e7ff5",
  },
  text: {
    color: "#757575",
    fontWeight: 800,
    fontSize: 16,
  },
  textActive: {
    color: "#222a44",
    fontWeight: 800,
    fontSize: 16,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
}));

const NavigationBar = (props) => {
  const classes = useStyles();

  const images = {
    Files: <Folder />,
    Image: <Image />,
    Others: <DevicesOther />,
    Video: <VideoLibrary />,
    Document: <InsertDriveFile />,
  };

  return (
    <List>
      <ListItem
        onClick={() => {
          props.setOpen(true);
          props.setSelectedItem("Home");
          props.setOpenSubMenu(!props.openSubMenu);
        }}
        button
      >
        <ListItemIcon
          className={
            props.selectedItem === "Home" ? classes.iconActive : classes.icon
          }
        >
          <Home />
        </ListItemIcon>
        <ListItemText
          disableTypography={true}
          className={
            props.selectedItem === "Home" ? classes.textActive : classes.text
          }
          primary={"Home"}
        />
      </ListItem>
      <Fragment>
        <ListItem
          onClick={() => {
            props.setOpen(true);
            props.setSelectedItem("D://");
            props.setOpenSubMenu(!props.openSubMenu);
          }}
          button
          key={"D://"}
        >
          <ListItemIcon
            className={
              props.selectedItem === "D://" ? classes.iconActive : classes.icon
            }
          >
            {images["Files"]}
          </ListItemIcon>
          <ListItemText
            disableTypography={true}
            className={
              props.selectedItem === "D://" ? classes.textActive : classes.text
            }
            primary={"D://"}
          />
          {props.selectedItem === "D://" && props.openSubMenu ? (
            <ExpandMore
              className={
                props.selectedItem === "D://"
                  ? classes.iconActive
                  : classes.icon
              }
            />
          ) : (
            <NavigateNext
              className={
                props.selectedItem === "D://"
                  ? classes.iconActive
                  : classes.icon
              }
            />
          )}
        </ListItem>
        <Collapse
          in={props.selectedItem === "D://" && props.openSubMenu}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" style={{ marginLeft: 30 }} disablePadding>
            {["Video", "Image", "Document", "Others"].map((text, index) => (
              <ListItem
                onClick={() => {
                  props.setSubMenuSelectedItem(text);
                }}
                button
                key={text}
              >
                <ListItemIcon
                  className={
                    props.selectedSubMenuItem === text
                      ? classes.iconActive
                      : classes.icon
                  }
                >
                  {images[text]}
                </ListItemIcon>
                <ListItemText
                  disableTypography={true}
                  className={
                    props.selectedSubMenuItem === text
                      ? classes.textActive
                      : classes.text
                  }
                  primary={text}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Fragment>
      <ListItem
        onClick={() => {
          props.setOpen(true);
          props.setSelectedItem("Contact");
          props.setOpenSubMenu(!props.openSubMenu);
        }}
        button
      >
        <ListItemIcon
          className={
            props.selectedItem === "Contact" ? classes.iconActive : classes.icon
          }
        >
          <Contacts />
        </ListItemIcon>
        <ListItemText
          disableTypography={true}
          className={
            props.selectedItem === "Contact" ? classes.textActive : classes.text
          }
          primary={"Contact"}
        />
      </ListItem>
      <ListItem
        onClick={() => {
          props.setOpen(true);
          props.setSelectedItem("Profile");
          props.setOpenSubMenu(!props.openSubMenu);
        }}
        button
      >
        <ListItemIcon
          className={
            props.selectedItem === "Profile" ? classes.iconActive : classes.icon
          }
        >
          <Person />
        </ListItemIcon>
        <ListItemText
          disableTypography={true}
          className={
            props.selectedItem === "Profile" ? classes.textActive : classes.text
          }
          primary={"Profile"}
        />
      </ListItem>
      <ListItem
        onClick={() => {
          localStorage.clear();
          props.history.push("/signin");
          props.setOpen(true);
          props.setSelectedItem("Logout");
          props.setOpenSubMenu(!props.openSubMenu);
        }}
        button
      >
        <ListItemIcon
          className={
            props.selectedItem === "Logout" ? classes.iconActive : classes.icon
          }
        >
          <ExitToApp />
        </ListItemIcon>
        <ListItemText
          disableTypography={true}
          className={
            props.selectedItem === "Logout" ? classes.textActive : classes.text
          }
          primary={"Logout"}
        />
      </ListItem>
    </List>
  );
};

export default withRouter(NavigationBar);

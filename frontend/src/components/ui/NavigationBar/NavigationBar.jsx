import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItem,
  List
} from "@material-ui/core";
import {
  ExpandMore,
  NavigateNext,
  Image,
  DevicesOther,
  VideoLibrary,
  Contacts,
  Person,
  ExitToApp,
  Home,
  Folder,
  Audiotrack,
  Assignment,
  Description,
  PictureAsPdf
} from "@material-ui/icons";
import { withRouter } from "react-router-dom";
import "./NavigationBar.css";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  icon: {
    color: "#757575"
  },
  iconActive: {
    color: "#5e7ff5"
  },
  text: {
    color: "#757575",
    fontWeight: 800,
    fontSize: 16
  },
  textActive: {
    color: "#222a44",
    fontWeight: 800,
    fontSize: 16
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(4)
  }
}));

const NavigationBar = props => {
  const [menu, setMenu] = useState([]);

  const classes = useStyles();

  let images = {
    files: <Folder />,
    image: <Image style={{ color: "#7e5ffe" }} />,
    audio: <Audiotrack style={{ color: "grey" }} />,
    ppt: <Assignment style={{ color: "#ca4424" }} />,
    word: <Description style={{ color: "#295491" }} />,
    excel: <Description style={{ color: "#000" }} />,
    pdf: <PictureAsPdf style={{ color: "#e71b23" }} />,
    other: <DevicesOther style={{ color: "#000" }} />,
    video: <VideoLibrary style={{ color: "#56ce55" }} />
  };

  const renderMenuIcon = (selectedItem, directory, isOpen) => {
    return selectedItem === directory && isOpen ? (
      <ExpandMore className={isOpen ? classes.iconActive : classes.icon} />
    ) : (
      <NavigateNext className={isOpen ? classes.iconActive : classes.icon} />
    );
  };

  const renderSubmenu = (matchItem, directoryName, directories, isOpen) => {
    return (
      <Collapse
        key={directoryName + Math.random()}
        in={matchItem === directoryName && isOpen}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" style={{ marginLeft: 10 }} disablePadding>
          {directories &&
            directories.length > 0 &&
            directories.map((text, index) => (
              <Fragment key={index}>
                <ListItem
                  style={{ whiteSpace: "normal" }}
                  onClick={() => {
                    if (text.directories.length > 0) {
                      props.navigation(index + 1, text.name);
                      props.setSubMenuSelectedItem(text.name);
                      if (typeof menu[text.name] === "undefined") {
                        setMenu(...menu, { [text.name]: true });
                      } else if (menu[text.name] === false) {
                        setMenu({ ...menu, [text.name]: true });
                      } else {
                        setMenu({ ...menu, [text.name]: false });
                      }
                    }
                  }}
                  button
                  key={text.name}
                >
                  <ListItemIcon
                    className={
                      menu[text.name] ? classes.iconActive : classes.icon
                    }
                  >
                    {Object.keys(text.info).length > 1
                      ? images["files"]
                      : images[Object.keys(text.info)[0]]}
                  </ListItemIcon>
                  <ListItemText
                    disableTypography={true}
                    className={
                      menu[text.name] ? classes.textActive : classes.text
                    }
                    primary={text.name}
                  />
                  {text.directories.length > 0 &&
                    renderMenuIcon(
                      props.selectedSubMenuItem,
                      text.name,
                      menu[text.name]
                    )}
                </ListItem>
                {text.directories.length > 0 &&
                  renderSubmenu(
                    text.name,
                    text.name,
                    text.directories,
                    menu[text.name]
                  )}
              </Fragment>
            ))}
        </List>
      </Collapse>
    );
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
          style={{ whiteSpace: "normal" }}
          onClick={() => {
            props.setOpen(true);
            props.history.push("/");
            setMenu([]);
            props.navigation(0, props.data.drive);
            props.setSelectedItem(props.data.drive);
            props.setOpenSubMenu(!props.openSubMenu);
          }}
          button
          key={props.data.drive}
        >
          <ListItemIcon
            className={
              props.selectedItem === props.data.drive
                ? classes.iconActive
                : classes.icon
            }
          >
            {images["files"]}
          </ListItemIcon>
          <ListItemText
            disableTypography={true}
            className={
              props.selectedItem === props.data.drive
                ? classes.textActive
                : classes.text
            }
            primary={props.data.drive}
          />
          {renderMenuIcon(
            props.selectedItem,
            props.data.drive,
            props.openSubMenu
          )}
        </ListItem>
        {renderSubmenu(
          props.selectedItem,
          props.data.drive,
          props.data?.directories,
          props.openSubMenu
        )}
      </Fragment>
      <ListItem
        onClick={() => {
          setMenu([]);
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
          props.history.push("/profile");
          setMenu([]);
          props.navigation("Profile", "Profile");
          props.setSelectedItem("Profile");
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
          localStorage.setItem("isLoggedIn", false);
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

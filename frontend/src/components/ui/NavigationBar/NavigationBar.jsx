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
  const [nav, setNav] = useState([]);
  const [path, setPath] = useState([]);

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

  const renderSubmenu = (matchItem, directoryName, data, isOpen) => {
    return (
      <Collapse
        key={directoryName + Math.random()}
        in={matchItem === directoryName && isOpen}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" style={{ marginLeft: 10 }} disablePadding>
          {data.directories &&
            data.directories.length > 0 &&
            data.directories.map((text, index) => (
              <Fragment key={index}>
                <ListItem
                  style={{ whiteSpace: "normal" }}
                  onClick={() => {
                    if (data.directories.length > 0) {
                      if (
                        path[path.length - 1] + "\\" ===
                        text.path.split(text.name)[0]
                      ) {
                        props.setNavigation(nav.concat(text.name));
                        setNav(nav.concat(text.name));
                        setPath(path.concat(text.path));
                      } else {
                        let strName = text.path.split(text.name)[0];
                        let getIndex = path.lastIndexOf(
                          strName.replace(new RegExp("\\\\" + "$"), "")
                        );
                        let navModified = nav.filter(
                          (item, itemIndex) => itemIndex <= getIndex
                        );
                        let pathModified = path.filter(
                          (item, itemIndex) => itemIndex <= getIndex
                        );

                        props.setNavigation(navModified.concat(text.name));
                        setNav(navModified.concat(text.name));
                        setPath(pathModified.concat(text.path));
                      }

                      props.setSubMenuSelectedItem(text.name);

                      let menuIndex = Object.keys({ ...menu, [text.name]: "" })
                        .map((m, i) => m)
                        .lastIndexOf(data.name);
                      let filtered = Object.keys({
                        ...menu,
                        [text.name]: ""
                      }).filter((m, i) => i <= menuIndex);
                      let m = {};
                      filtered.map(d => {
                        return (m[d] = true);
                      });

                      if (typeof menu[text.name] === "undefined") {
                        let menuIndex = Object.keys({
                          ...menu,
                          [text.name]: ""
                        })
                          .map((m, i) => m)
                          .lastIndexOf(data.name);
                        let filtered = Object.keys({
                          ...menu,
                          [text.name]: ""
                        }).filter((m, i) => i <= menuIndex);
                        let m = {};
                        filtered.map(d => {
                          return (m[d] = true);
                        });
                        setMenu({ ...m, [text.name]: true });
                        let activeFiltered = props.activeItem.filter(
                          (_d, i) => i <= menuIndex + 1
                        );
                        props.setActiveItem(activeFiltered.concat(text));
                      } else if (menu[text.name] === false) {
                        let menuIndex = Object.keys({
                          ...menu,
                          [text.name]: ""
                        })
                          .map((m, i) => m)
                          .lastIndexOf(data.name);
                        let filtered = Object.keys({
                          ...menu,
                          [text.name]: ""
                        }).filter((m, i) => i <= menuIndex);
                        let m = {};
                        filtered.map(d => {
                          return (m[d] = true);
                        });
                        let activeFiltered = props.activeItem.filter(
                          (_d, i) => i <= menuIndex + 1
                        );
                        props.setActiveItem(activeFiltered.concat(text));
                        setMenu({ ...m, [text.name]: true });
                      } else {
                        let menuIndex = Object.keys({
                          ...menu,
                          [text.name]: ""
                        })
                          .map((m, i) => m)
                          .lastIndexOf(data.name);

                        let activeFiltered = props.activeItem.filter(
                          (_d, i) => i <= menuIndex + 1
                        );
                        props.setActiveItem(activeFiltered.concat(text));
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
                    {images["files"]}
                  </ListItemIcon>
                  <ListItemText
                    disableTypography={true}
                    className={
                      menu[text.name] ? classes.textActive : classes.text
                    }
                    primary={text.name}
                  />
                  {text.directories.length > 0 &&
                    renderMenuIcon(matchItem, directoryName, menu[text.name])}
                </ListItem>
                {text.directories.length > 0 &&
                  renderSubmenu(text.name, text.name, text, menu[text.name])}
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
          props.setSelectedItem("Home");
          props.setNavigation([]);
          props.history.push("/");
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
            setMenu([]);
            props.setActiveItem(props.activeItem.concat(props.data));
            props.setNavigation([props.data.drive]);
            setNav([props.data.drive]);
            setPath([props.data.drive + ":"]);
            props.setSelectedItem(props.data.drive);
            props.setOpenSubMenu(!props.openSubMenu);
            props.history.push("/");
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
          props.data,
          props.openSubMenu
        )}
      </Fragment>
      <ListItem
        onClick={() => {
          setMenu([]);
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
          props.setNavigation(["Profile"]);
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

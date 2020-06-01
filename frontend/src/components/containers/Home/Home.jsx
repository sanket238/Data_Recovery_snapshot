import React, { useState, useEffect } from "react";
import {
  Container,
  Divider,
  CssBaseline,
  Drawer,
  IconButton
} from "@material-ui/core";
import BreadCrumb from "../../ui/BreadCrumb/BreadCrumb";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import Header from "../../ui/Header/Header";
import NavigationBar from "../../ui/NavigationBar/NavigationBar";
import Dashboard from "../Dashboard/Dashboard";
import { Switch, Route, withRouter } from "react-router-dom";
import File from "./parse.json";
import Profile from "../Profile/Profile";
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1
    }
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
    padding: theme.spacing(3)
  },
  breadcrumb: {
    marginBottom: 25
  }
}));

const Home = props => {
  const [navigation, setNavigation] = useState([]);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openSubMenu, setOpenSubMenu] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState("");
  const [selectedSubMenuItem, setSubMenuSelectedItem] = React.useState("");
  const [, setError] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [activeItem, setActiveItem] = React.useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/user/data/`, {
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
        setError(true);
      });
  }, []);

  const files = [
    {
      label: "D://",
      icon: "Files",
      value: "21.2K",
      directory: [
        { label: "Video Files", icon: "Video", value: "21.2K" },
        { label: "Image Files", icon: "Image", value: "21.2K" },
        { label: "Document Files", icon: "Document", value: "21.2K" },
        { label: "Other Files", icon: "Other", value: "21.2K" }
      ]
    },
    {
      label: "E://",
      icon: "Files",
      value: "21.2K",
      directory: [
        {
          label: "lib",
          icon: "Files",
          value: "21.2K",
          directory: [
            { label: "Video Files", icon: "Video", value: "21.2K" },
            { label: "Image Files", icon: "Image", value: "21.2K" },
            { label: "Document Files", icon: "Document", value: "21.2K" },
            { label: "Other Files", icon: "Other", value: "21.2K" }
          ]
        },
        {
          label: "boot",
          icon: "Files",
          value: "21.2K",
          directory: [
            { label: "Video Files", icon: "Video", value: "21.2K" },
            { label: "Image Files", icon: "Image", value: "21.2K" },
            { label: "Document Files", icon: "Document", value: "21.2K" },
            { label: "Other Files", icon: "Other", value: "21.2K" }
          ]
        },
        {
          label: "etc",
          icon: "Files",
          value: "21.2K",
          directory: [
            { label: "Video Files", icon: "Video", value: "21.2K" },
            { label: "Image Files", icon: "Image", value: "21.2K" },
            { label: "Document Files", icon: "Document", value: "21.2K" },
            { label: "Other Files", icon: "Other", value: "21.2K" }
          ]
        }
      ]
    }
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setNavigation([]);
    setOpenSubMenu(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header
        open={open}
        setNavigation={setNavigation}
        handleDrawerOpen={handleDrawerOpen}
        title={"Data Recovery"}
        setHome={() => {
          setOpenSubMenu(false);
          setSelectedItem("Home");
          setSubMenuSelectedItem("");
          setNavigation([]);
        }}
      />

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <NavigationBar
          files={files}
          openSubMenu={openSubMenu}
          setOpenSubMenu={value => setOpenSubMenu(value)}
          selectedItem={selectedItem}
          setSelectedItem={value => setSelectedItem(value)}
          selectedSubMenuItem={selectedSubMenuItem}
          setSubMenuSelectedItem={value => setSubMenuSelectedItem(value)}
          setOpen={open => setOpen(open)}
          data={data}
          setNavigation={data => setNavigation(data)}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          navigationData={navigation}
          navigation={(index, data) => {
            return typeof index === "string"
              ? !navigation.includes(data) &&
                  setNavigation(navigation.concat(data))
              : navigation.includes(data)
              ? index === 0
                ? setNavigation([])
                : setNavigation(
                    navigation.filter((item, itemIndex) => itemIndex < index)
                  )
              : setNavigation(navigation.concat(data));
          }}
        />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container>
          <div className={classes.breadcrumb}>
            <BreadCrumb
              handleClick={index => {
                return index === 0
                  ? (setNavigation([]),
                    props.history.push("/"),
                    setSelectedItem(""),
                    setActiveItem([]))
                  : (setNavigation(
                      navigation.filter((item, itemIndex) => itemIndex < index)
                    ),
                    setActiveItem(
                      activeItem.filter((item, itemIndex) => itemIndex < index)
                    ));
              }}
              data={navigation}
            />
          </div>
          <div>
            <Switch>
              <Route
                path="/"
                exact
                component={() => (
                  <Dashboard
                    data={data}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                    navigation={navigation}
                    setNavigation={setNavigation}
                  />
                )}
              />
              <Route path="/profile" exact component={() => <Profile />} />
            </Switch>
          </div>
        </Container>
      </main>
    </div>
  );
};

export default withRouter(Home);

import React, { useState } from "react";
import {
  Grid,
  Container,
  Divider,
  CssBaseline,
  Drawer,
  IconButton,
} from "@material-ui/core";
import Card from "../../ui/Card/Card";
import BreadCrumb from "../../ui/BreadCrumb/BreadCrumb";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import Header from "../../ui/Header/Header";
import NavigationBar from "../../ui/NavigationBar/NavigationBar";
import Data from "../parse.json";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
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
    padding: theme.spacing(3),
  },
  breadcrumb: {
    marginBottom: 25,
  },
}));

export default function Home() {
  const [navigation, setNavigation] = useState([]);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openSubMenu, setOpenSubMenu] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState("");
  const [selectedSubMenuItem, setSubMenuSelectedItem] = React.useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setOpenSubMenu(false);
  };

  const files = [
    {
      label: "D://",
      icon: "Files",
      value: "21.2K",
      directory: [
        { label: "Video Files", icon: "Video", value: "21.2K" },
        { label: "Image Files", icon: "Image", value: "21.2K" },
        { label: "Document Files", icon: "Document", value: "21.2K" },
        { label: "Other Files", icon: "Other", value: "21.2K" },
      ],
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
            { label: "Other Files", icon: "Other", value: "21.2K" },
          ],
        },
        {
          label: "boot",
          icon: "Files",
          value: "21.2K",
          directory: [
            { label: "Video Files", icon: "Video", value: "21.2K" },
            { label: "Image Files", icon: "Image", value: "21.2K" },
            { label: "Document Files", icon: "Document", value: "21.2K" },
            { label: "Other Files", icon: "Other", value: "21.2K" },
          ],
        },
        {
          label: "etc",
          icon: "Files",
          value: "21.2K",
          directory: [
            { label: "Video Files", icon: "Video", value: "21.2K" },
            { label: "Image Files", icon: "Image", value: "21.2K" },
            { label: "Document Files", icon: "Document", value: "21.2K" },
            { label: "Other Files", icon: "Other", value: "21.2K" },
          ],
        },
      ],
    },
  ];

  const renderCards = () => {
    const cardTree = navigation.length;

    switch (cardTree) {
      case 0:
        return (
          <Card
            style={{ cursor: "pointer" }}
            key={Data.drive}
            onClick={(value) =>
              typeof Data.directories !== "undefined" &&
              Data.directories.length > 0
                ? setNavigation(navigation.concat(Data.drive))
                : {}
            }
            label={Data.drive}
            icon={"Files"}
            value={Data.totalFiles}
          />
        );

      case 1:
        return Data.directories.map((card, index) => {
          return (
            <Card
              style={
                typeof card.directories !== "undefined" &&
                card.directories.length > 0
                  ? { cursor: "pointer" }
                  : {}
              }
              key={index}
              onClick={(value) =>
                typeof card.directories !== "undefined" &&
                card.directories.length > 0
                  ? setNavigation(navigation.concat(value))
                  : {}
              }
              label={card.name}
              icon={"Files"}
              value={card.numberOfFiles}
            />
          );
        });

      case 2:
        return Data.directories
          .filter((card) => card.name === navigation[1])[0]
          ?.directories.map((card, index) => {
            return (
              <Card
                style={
                  typeof card.directories !== "undefined" &&
                  card.directories.length > 0
                    ? { cursor: "pointer" }
                    : {}
                }
                key={index}
                onClick={(value) =>
                  typeof card.directories !== "undefined" &&
                  card.directories.length > 0
                    ? setNavigation(navigation.concat(value))
                    : {}
                }
                label={card.name}
                icon={"Files"}
                value={card.numberOfFiles}
              />
            );
          });

      case 3:
        return Data.directories
          .filter((card) => card.name === navigation[1])[0]
          ?.directories.filter((card) => card.name === navigation[2])[0]
          ?.directories.map((card, index) => {
            return (
              <Card
                style={
                  typeof card.directories !== "undefined" &&
                  card.directories.length > 0
                    ? { cursor: "pointer" }
                    : {}
                }
                key={index}
                onClick={(value) =>
                  typeof card.directories !== "undefined" &&
                  card.directories.length > 0
                    ? setNavigation(navigation.concat(value))
                    : {}
                }
                label={card.name}
                icon={"Files"}
                value={card.numberOfFiles}
              />
            );
          });

      default:
        return files.map((card, index) => {
          return (
            <Card
              style={{ cursor: "pointer" }}
              key={index}
              onClick={(value) => setNavigation(navigation.concat(value))}
              label={card.label}
              icon={card.icon}
              value={card.value}
            />
          );
        });
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        title={"Data Recovery"}
      />

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
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
          setOpenSubMenu={(value) => setOpenSubMenu(value)}
          selectedItem={selectedItem}
          setSelectedItem={(value) => setSelectedItem(value)}
          selectedSubMenuItem={selectedSubMenuItem}
          setSubMenuSelectedItem={(value) => setSubMenuSelectedItem(value)}
          setOpen={(open) => setOpen(open)}
        />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container>
          <div className={classes.breadcrumb}>
            <BreadCrumb
              handleClick={(index) => {
                return index === 0
                  ? setNavigation([])
                  : index - 1 === navigation.length
                  ? null
                  : setNavigation(navigation.splice(index - 1, 1));
              }}
              data={navigation}
            />
          </div>
          <Grid container spacing={3} item>
            {renderCards()}
          </Grid>
        </Container>
      </main>
    </div>
  );
}

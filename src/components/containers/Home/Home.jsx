import React, { useState } from "react";
import { Grid, Container } from "@material-ui/core";
import Card from "../../ui/Card/Card";
import BreadCrumb from "../../ui/BreadCrumb/BreadCrumb";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Header from "../../ui/Header/Header";
import NavigationBar from "../../ui/NavigationBar/NavigationBar";

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
      //   directory: [
      //     {
      //       label: "Recycle bin",
      //       icon: "Files",
      //       value: "26.2K",
      //       directory: [
      //         { label: "Video Files", icon: "Video", value: "10.2K" },
      //         { label: "Image Files", icon: "Image", value: "1.22K" },
      //         { label: "Document Files", icon: "Document", value: "11.2K" },
      //         { label: "Other Files", icon: "Other", value: "2.2K" },
      //       ],
      //     },
      //     {
      //       label: "Temp",
      //       icon: "Files",
      //       value: "21.2K",
      //       directory: [
      //         { label: "Video Files", icon: "Video", value: "21.2K" },
      //         { label: "Image Files", icon: "Image", value: "21.2K" },
      //         { label: "Document Files", icon: "Document", value: "21.2K" },
      //         { label: "Other Files", icon: "Other", value: "21.2K" },
      //       ],
      //     },
      //     {
      //       label: "Bin",
      //       icon: "Files",
      //       value: "21.2K",
      //       directory: [
      //         { label: "Video Files", icon: "Video", value: "21.2K" },
      //         { label: "Image Files", icon: "Image", value: "21.2K" },
      //         { label: "Document Files", icon: "Document", value: "21.2K" },
      //         { label: "Other Files", icon: "Other", value: "21.2K" },
      //       ],
      //     },
      //   ],
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
        return files.map((card, index) => {
          return (
            <Card
              style={{ cursor: "pointer" }}
              key={index}
              onClick={(value) =>
                typeof card.directory !== "undefined"
                  ? setNavigation(navigation.concat(value))
                  : {}
              }
              label={card.label}
              icon={card.icon}
              value={card.value}
            />
          );
        });

      case 1:
        return files
          .filter((file) => file.label === navigation[0])[0]
          .directory.map((card, index) => {
            return (
              <Card
                style={
                  typeof card.directory !== "undefined"
                    ? { cursor: "pointer" }
                    : {}
                }
                key={index}
                onClick={(value) =>
                  typeof card.directory !== "undefined"
                    ? setNavigation(navigation.concat(value))
                    : {}
                }
                label={card.label}
                icon={card.icon}
                value={card.value}
              />
            );
          });

      case 2:
        return files
          .filter((file) => file.label === navigation[0])[0]
          .directory.filter((file) => file.label === navigation[1])[0]
          .directory.map((card, index) => {
            return (
              <Card
                key={index}
                onClick={(value) =>
                  typeof card.directory !== "undefined"
                    ? setNavigation(navigation.concat(value))
                    : {}
                }
                label={card.label}
                icon={card.icon}
                value={card.value}
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
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
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

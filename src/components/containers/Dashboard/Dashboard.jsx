import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Grid, Container } from "@material-ui/core";
import Card from "../../ui/Card/Card";
import Header from "../../ui/Header/Header";
import NavigationBar from "../../ui/NavigationBar/NavigationBar";
import BreadCrumb from "../../ui/BreadCrumb/BreadCrumb";

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

export default function Dashboard() {
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
            <BreadCrumb />
          </div>
          <Grid container spacing={3} item>
            <Card label={"Recycle bin"} icon={"Files"} value={"21.2K"} />
            <Card label={"Video Files"} icon={"Video"} value={"21.2K"} />
            <Card label={"Image Files"} icon={"Image"} value={"21.2K"} />
            <Card label={"Document Files"} icon={"Document"} value={"21.2K"} />
            <Card label={"Other Files"} icon={"Other"} value={"21.2K"} />
          </Grid>
        </Container>
      </main>
    </div>
  );
}

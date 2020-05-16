import React, { useState, useEffect, Fragment } from "react";
import {
  Grid,
  Container,
  Divider,
  CssBaseline,
  Drawer,
  IconButton
} from "@material-ui/core";
import Card from "../../ui/Card/Card";
import { Card as MaterialCard } from "@material-ui/core";
import BreadCrumb from "../../ui/BreadCrumb/BreadCrumb";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import Header from "../../ui/Header/Header";
import NavigationBar from "../../ui/NavigationBar/NavigationBar";
import CommonChart from "../../charts/CommonChart/CommonChart";
import PieChart from "../../charts/PieChart/PieChart";
import Title from "../../ui/Title/Title";
import WordTree from "../../charts/WordTree/WordTree";
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

export default function Home() {
  const [navigation, setNavigation] = useState([]);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openSubMenu, setOpenSubMenu] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState("");
  const [selectedSubMenuItem, setSubMenuSelectedItem] = React.useState("");
  const [, setError] = React.useState(false);
  const [data, setData] = React.useState([]);

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

  let chartData = [
    { name: "Directory1", Files: "1000" },
    { name: "New Folder", Files: "1500" },
    { name: "Adobe", Files: "800" },
    { name: "Downloads", Files: "400" },
    { name: "Pictures", Files: "1800" }
  ];

  let PieChartData = [
    ["Directory1", 1000],
    ["New Folder", 1500],
    ["Adobe", 800],
    ["Downloads", 400],
    ["Pictures", 1800]
  ];

  let PieChartSizeData = [
    ["Directory1", 204],
    ["New Folder", 5002.6],
    ["Adobe", 802],
    ["Downloads", 4000],
    ["Pictures", 6500]
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setNavigation([]);
    setOpenSubMenu(false);
  };

  const renderCharts = () => {
    const cardTree = navigation.length;
    let Columns = [
      { type: "string", label: "name" },
      { type: "number", label: "value" }
    ];

    switch (cardTree) {
      case 0:
        return (
          <Fragment>
            <Grid xs={12} md={6} lg={6} sm={6} item>
              <MaterialCard>
                <div style={{ padding: 15 }}>
                  <Title title="Files in Directories" />

                  <CommonChart
                    grid={false}
                    chart={"BarChart"}
                    data={chartData}
                    labels={["Files"]}
                    colors={["#192a56"]}
                  />
                </div>
              </MaterialCard>
            </Grid>
            <Grid xs={12} md={6} lg={6} sm={6} item>
              <MaterialCard>
                <div style={{ padding: 15, minHeight: 337 }}>
                  <Title title="Files in Directories by %" />
                  <PieChart
                    placeholder={false}
                    emptyClassName={"m-t-40"}
                    chartArea={{ left: 25, top: 15, right: 25, bottom: 15 }}
                    rows={PieChartData}
                    columns={Columns}
                    chartType={"PieChart"}
                    height={"270px"}
                  />
                </div>
              </MaterialCard>
            </Grid>
            <Grid xs={12} md={6} lg={6} sm={6} item>
              <MaterialCard>
                <div style={{ padding: 15, minHeight: 337 }}>
                  <Title title="Size of Directories(in MB)" />
                  <PieChart
                    placeholder={false}
                    emptyClassName={"m-t-40"}
                    chartArea={{ left: 25, top: 15, right: 25, bottom: 15 }}
                    rows={PieChartSizeData}
                    columns={Columns}
                    chartType={"PieChart"}
                    height={"270px"}
                  />
                </div>
              </MaterialCard>
            </Grid>
            <Grid xs={12} md={6} lg={6} sm={6} item>
              <MaterialCard>
                <div style={{ padding: 15, maxHeight: 337 }}>
                  <Title title="Directories Structure" />
                  <WordTree />
                </div>
              </MaterialCard>
            </Grid>
          </Fragment>
        );

      default:
        return;
    }
  };

  const renderCards = () => {
    const cardTree = navigation.length;

    switch (cardTree) {
      case 0:
        return (
          <Card
            style={{ cursor: "pointer" }}
            key={data.drive}
            onClick={value =>
              typeof data.directories !== "undefined" &&
              data.directories.length > 0
                ? setNavigation(navigation.concat(data.drive))
                : {}
            }
            label={data.drive}
            icon={"files"}
            value={data.totalFiles}
          />
        );

      case 1:
        return data.directories.map((card, index) => {
          return (
            <Card
              style={
                typeof card.directories !== "undefined" &&
                card.directories.length > 0
                  ? { cursor: "pointer" }
                  : {}
              }
              key={index}
              onClick={value =>
                typeof card.directories !== "undefined" &&
                card.directories.length > 0
                  ? setNavigation(navigation.concat(value))
                  : {}
              }
              label={card.name}
              icon={
                Object.keys(card.info).length > 1
                  ? "files"
                  : Object.keys(card.info)[0]
              }
              value={card.numberOfFiles}
            />
          );
        });

      case 2:
        return data.directories
          .filter(card => card.name === navigation[1])[0]
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
                onClick={value =>
                  typeof card.directories !== "undefined" &&
                  card.directories.length > 0
                    ? setNavigation(navigation.concat(value))
                    : {}
                }
                label={card.name}
                icon={
                  Object.keys(card.info).length > 1
                    ? "files"
                    : Object.keys(card.info)[0]
                }
                value={card.numberOfFiles}
              />
            );
          });

      case 3:
        return data.directories
          .filter(card => card.name === navigation[1])[0]
          ?.directories.filter(card => card.name === navigation[2])[0]
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
                onClick={value =>
                  typeof card.directories !== "undefined" &&
                  card.directories.length > 0
                    ? setNavigation(navigation.concat(value))
                    : {}
                }
                label={card.name}
                icon={
                  Object.keys(card.info).length > 1
                    ? "files"
                    : Object.keys(card.info)[0]
                }
                value={card.numberOfFiles}
              />
            );
          });

      default:
        return (
          <Card
            style={{ cursor: "pointer" }}
            key={data.drive}
            onClick={value =>
              typeof data.directories !== "undefined" &&
              data.directories.length > 0
                ? setNavigation(navigation.concat(data.drive))
                : {}
            }
            label={data.drive}
            icon={"Files"}
            value={data.totalFiles}
          />
        );
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
          navigation={(index, data) => {
            return navigation.includes(data)
              ? index === 0
                ? setNavigation([])
                : setNavigation(
                    navigation.splice(navigation.indexOf(data) - 1, 1)
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
          <Grid container style={{ marginTop: 25 }} spacing={3} item>
            {renderCharts()}
          </Grid>
        </Container>
      </main>
    </div>
  );
}

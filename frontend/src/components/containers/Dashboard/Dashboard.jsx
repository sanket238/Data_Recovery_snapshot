import React, { Fragment } from "react";
import { Grid, Paper } from "@material-ui/core";
import Card from "../../ui/Card/Card";
import CommonChart from "../../charts/CommonChart/CommonChart";
import PieChart from "../../charts/PieChart/PieChart";
import Title from "../../ui/Title/Title";
import WordTree from "../../charts/WordTree/WordTree";

const Dashboard = props => {
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

  const renderCharts = () => {
    const cardTree = props.navigation.length;
    let Columns = [
      { type: "string", label: "name" },
      { type: "number", label: "value" }
    ];

    switch (cardTree) {
      case 0:
        return (
          <Fragment>
            <Grid xs={12} md={6} lg={6} sm={6} item>
              <Paper elevation={3}>
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
              </Paper>
            </Grid>
            <Grid xs={12} md={6} lg={6} sm={6} item>
              <Paper elevation={3}>
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
              </Paper>
            </Grid>
            <Grid xs={12} md={6} lg={6} sm={6} item>
              <Paper elevation={3}>
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
              </Paper>
            </Grid>
            <Grid xs={12} md={6} lg={6} sm={6} item>
              <Paper elevation={3}>
                <div style={{ padding: 15, maxHeight: 337 }}>
                  <Title title="Directories Structure" />
                  <WordTree />
                </div>
              </Paper>
            </Grid>
          </Fragment>
        );

      default:
        return;
    }
  };

  const renderCards = () => {
    const cardTree = props.navigation.length;

    switch (cardTree) {
      case 0:
        return (
          <Card
            style={{ cursor: "pointer" }}
            key={props.data.drive}
            onClick={value =>
              typeof props.data.directories !== "undefined" &&
              props.data.directories.length > 0
                ? props.setNavigation(props.navigation.concat(props.data.drive))
                : {}
            }
            label={props.data.drive}
            icon={"files"}
            value={props.data.totalFiles}
          />
        );

      case 1:
        return props.data.directories.map((card, index) => {
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
                  ? props.setNavigation(props.navigation.concat(value))
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
        return props.data.directories
          .filter(card => card.name === props.navigation[1])[0]
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
                    ? props.setNavigation(props.navigation.concat(value))
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
        return props.data.directories
          .filter(card => card.name === props.navigation[1])[0]
          ?.directories.filter(card => card.name === props.navigation[2])[0]
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
                    ? props.setNavigation(props.navigation.concat(value))
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
            key={props.data.drive}
            onClick={value =>
              typeof props.data.directories !== "undefined" &&
              props.data.directories.length > 0
                ? props.setNavigation(props.navigation.concat(props.data.drive))
                : {}
            }
            label={props.data.drive}
            icon={"Files"}
            value={props.data.totalFiles}
          />
        );
    }
  };

  return (
    <div>
      <Grid container spacing={3} item>
        {renderCards()}
      </Grid>
      <Grid container style={{ marginTop: 25 }} spacing={3} item>
        {renderCharts()}
      </Grid>
    </div>
  );
};

export default Dashboard;

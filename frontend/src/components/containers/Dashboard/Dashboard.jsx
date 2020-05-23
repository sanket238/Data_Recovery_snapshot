import React, { Fragment } from "react";
import { Grid, Paper } from "@material-ui/core";
import Card from "../../ui/Card/Card";
import CommonChart from "../../charts/CommonChart/CommonChart";
import PieChart from "../../charts/PieChart/PieChart";
import Title from "../../ui/Title/Title";
import WordTree from "../../charts/WordTree/WordTree";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { formatBytes } from "../../../utils/utils";
import Menu from "../../ui/Menu/Menu";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const Dashboard = props => {
  const [selectedTableCard, setSelectedTableCard] = React.useState("");
  const [filterItem, setFilterItem] = React.useState("All Directories");

  const renderCharts = () => {
    const cardTree = props.navigation.length;
    let Columns = [
      { type: "string", label: "name" },
      { type: "number", label: "value" }
    ];

    let FormattedColumns = [
      { type: "string", label: "name" },
      { type: "number", label: "value" },
      { type: "string", role: "tooltip" }
    ];

    switch (cardTree) {
      case 0:
        let totaldatafiles = {};
        let totaldirsData = {};
        let words = [["Phrases"]];
        typeof props.data.directories !== "undefined" &&
          props.data.directories.map(dir => {
            let fileList = {};
            words.push([
              "/ " + props.data.drive + " " + dir.name.replace(/ /g, "")
            ]);
            dir.directories.map(data => {
              words.push([
                "/ " +
                  props.data.drive +
                  " " +
                  dir.name.replace(/ /g, "") +
                  " " +
                  data.name.replace(/ /g, "")
              ]);
              fileList[data.name] = {
                name: data.name,
                files: data.numberOfFiles,
                size: data.totalSize
              };
              let field = totaldatafiles[data.name];

              typeof field === "undefined"
                ? (totaldatafiles[data.name] = {
                    name: data.name,
                    files: data.numberOfFiles,
                    size: data.totalSize
                  })
                : (totaldatafiles[data.name] = {
                    name: field.name,
                    files: field.files + data.numberOfFiles,
                    size: field.size + data.totalSize
                  });
            });
            totaldirsData[dir.name] = fileList;
          });

        const totaldirChartData = Object.values(totaldatafiles).map(data => {
          return { name: data.name, Files: data.files };
        });

        const totaldirChartDatabyPerc = Object.values(totaldatafiles).map(
          data => {
            return [data.name, data.files];
          }
        );

        const totaldirSizeData = Object.values(totaldatafiles).map(data => {
          return { name: data.name, Files: data.size };
        });

        const totaldirSizeDatabyPerc = Object.values(totaldatafiles).map(
          data => {
            return [data.name, data.size, formatBytes(data.size)];
          }
        );

        return (
          <Fragment>
            <Grid xs={12} md={6} lg={6} sm={6} item>
              <Paper elevation={3}>
                <div style={{ padding: 15 }}>
                  <Title title="Total Number of Files By File Type" />
                  <CommonChart
                    grid={false}
                    chart={"BarChart"}
                    data={totaldirChartData}
                    labels={["Files"]}
                    colors={["#192a56"]}
                  />
                </div>
              </Paper>
            </Grid>
            <Grid xs={12} md={6} lg={6} sm={6} item>
              <Paper elevation={3}>
                <div style={{ padding: 15, minHeight: 337 }}>
                  <Title title="Total Number of Files By File Type By %" />
                  <PieChart
                    placeholder={false}
                    emptyClassName={"m-t-40"}
                    chartArea={{ left: 25, top: 15, right: 25, bottom: 15 }}
                    rows={totaldirChartDatabyPerc}
                    columns={Columns}
                    chartType={"PieChart"}
                    height={"270px"}
                  />
                </div>
              </Paper>
            </Grid>

            <Grid xs={12} md={6} lg={6} sm={6} item>
              <Paper elevation={3}>
                <div style={{ padding: 15 }}>
                  <Title title="Total Size of Directories(in MB) By File Type" />
                  <CommonChart
                    grid={false}
                    chart={"BarChart"}
                    data={totaldirSizeData}
                    format={true}
                    labels={["Files"]}
                    colors={["#192a56"]}
                  />
                </div>
              </Paper>
            </Grid>
            <Grid xs={12} md={6} lg={6} sm={6} item>
              <Paper elevation={3}>
                <div style={{ padding: 15, minHeight: 337 }}>
                  <Title title="Total Size of Directories(in MB) By File Type By %" />
                  <PieChart
                    generateTooltip={true}
                    placeholder={false}
                    emptyClassName={"m-t-40"}
                    chartArea={{ left: 25, top: 15, right: 25, bottom: 15 }}
                    rows={totaldirSizeDatabyPerc}
                    columns={FormattedColumns}
                    chartType={"PieChart"}
                    height={"270px"}
                  />
                </div>
              </Paper>
            </Grid>
            <Grid xs={12} md={6} lg={6} sm={6} item>
              <Paper elevation={3}>
                <div style={{ padding: 15, maxHeight: 337, minHeight: 337 }}>
                  <Title title="Directories Structure" />
                  <WordTree data={words} current={"/"} />
                </div>
              </Paper>
            </Grid>
          </Fragment>
        );

      case 1:
        let datafiles = {};
        let dirsData = {};

        props.data.directories
          .filter(dir =>
            filterItem === "All Directories" ? true : dir.name === filterItem
          )
          .map(dir => {
            let fileList = {};
            dir.directories.map(data => {
              fileList[data.name] = {
                name: data.name,
                files: data.numberOfFiles,
                size: data.totalSize
              };
              let field = datafiles[data.name];

              typeof field === "undefined"
                ? (datafiles[data.name] = {
                    name: data.name,
                    files: data.numberOfFiles,
                    size: data.totalSize
                  })
                : (datafiles[data.name] = {
                    name: field.name,
                    files: field.files + data.numberOfFiles,
                    size: field.size + data.totalSize
                  });
            });
            dirsData[dir.name] = fileList;
          });

        const dirChartData = Object.values(datafiles).map(data => {
          return { name: data.name, Files: data.files };
        });

        const dirChartDatabyPerc = Object.values(datafiles).map(data => {
          return [data.name, data.files];
        });

        const dirSizeData = Object.values(datafiles).map(data => {
          return { name: data.name, Files: data.size };
        });

        const dirSizeDatabyPerc = Object.values(datafiles).map(data => {
          return [data.name, data.size, formatBytes(data.size)];
        });

        const dirList = props.data.directories.map(dir => dir.name);

        return (
          <Fragment>
            <div style={{ display: "flex", width: "100%", padding: 15 }}>
              <Title
                title={
                  dirList.length > 1 ? `Overview of ${filterItem}` : "Overview"
                }
              />
              {dirList.length > 1 ? (
                <Menu
                  list={[...dirList, "All Directories"]}
                  setFilterItem={setFilterItem}
                />
              ) : null}
            </div>
            <Grid xs={12} md={6} lg={6} sm={6} item>
              <Paper elevation={3}>
                <div style={{ padding: 15 }}>
                  <Title title="Total Number of Files By File Type" />
                  <CommonChart
                    grid={false}
                    chart={"BarChart"}
                    data={dirChartData}
                    labels={["Files"]}
                    colors={["#192a56"]}
                  />
                </div>
              </Paper>
            </Grid>
            <Grid xs={12} md={6} lg={6} sm={6} item>
              <Paper elevation={3}>
                <div style={{ padding: 15, minHeight: 337 }}>
                  <Title title="Total Number of Files By File Type By %" />
                  <PieChart
                    placeholder={false}
                    emptyClassName={"m-t-40"}
                    chartArea={{ left: 25, top: 15, right: 25, bottom: 15 }}
                    rows={dirChartDatabyPerc}
                    columns={Columns}
                    chartType={"PieChart"}
                    height={"270px"}
                  />
                </div>
              </Paper>
            </Grid>

            <Grid xs={12} md={6} lg={6} sm={6} item>
              <Paper elevation={3}>
                <div style={{ padding: 15 }}>
                  <Title title="Total Size of Directories(in MB) By File Type" />
                  <CommonChart
                    grid={false}
                    chart={"BarChart"}
                    data={dirSizeData}
                    format={true}
                    labels={["Files"]}
                    colors={["#192a56"]}
                  />
                </div>
              </Paper>
            </Grid>
            <Grid xs={12} md={6} lg={6} sm={6} item>
              <Paper elevation={3}>
                <div style={{ padding: 15, minHeight: 337 }}>
                  <Title title="Total Size of Directories(in MB) By File Type By %" />
                  <PieChart
                    generateTooltip={true}
                    placeholder={false}
                    emptyClassName={"m-t-40"}
                    chartArea={{ left: 25, top: 15, right: 25, bottom: 15 }}
                    rows={dirSizeDatabyPerc}
                    columns={FormattedColumns}
                    chartType={"PieChart"}
                    height={"270px"}
                  />
                </div>
              </Paper>
            </Grid>
          </Fragment>
        );

      case 2:
        const level2PieChartFiles = props.data.directories
          .filter(directory => directory.name === props.navigation[1])[0]
          .directories.map(files => {
            return [files.name, files.numberOfFiles];
          });

        const dir = props.data.directories
          .filter(directory => directory.name === props.navigation[1])[0]
          .directories // .directories.filter(dir =>
          //   selectedTableCard !== "" ? dir.name === selectedTableCard : true
          // )
          .map(files => {
            return files.files;
          });
        const singleArray = dir.flat(1);
        const column = [
          { title: "Name", field: "name" },
          {
            title: "Size",
            field: "size",
            render: rowData => formatBytes(rowData.size)
          },
          {
            title: "Date",
            field: "date",
            render: rowData => rowData.date + " " + rowData.time
          }
        ];

        const data = singleArray.map(data => {
          return {
            name: data.name,
            size: data.size,
            date: data.date,
            time: data.time
          };
        });
        return (
          <Fragment>
            <Grid xs={12} md={6} lg={6} sm={6} item>
              <Paper elevation={3}>
                <div style={{ maxHeight: 440, overflowY: "auto" }}>
                  <MaterialTable
                    icons={tableIcons}
                    title={
                      <Title
                        title={
                          "All Files"
                          // selectedTableCard === ""
                          //   ? "All Files"
                          //   : selectedTableCard
                        }
                      />
                    }
                    columns={column}
                    data={data}
                  />
                </div>
              </Paper>
            </Grid>
            <Grid xs={12} md={6} lg={6} sm={6} item>
              <Paper elevation={3}>
                <div style={{ padding: 15, minHeight: 440 }}>
                  <Title title="Size of Directories(in MB) By File Type By %" />
                  <PieChart
                    generateTooltip={true}
                    placeholder={false}
                    emptyClassName={"m-t-40"}
                    chartArea={{ left: 25, top: 15, right: 25, bottom: 15 }}
                    rows={level2PieChartFiles}
                    columns={Columns}
                    chartType={"PieChart"}
                    height={"270px"}
                  />
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
            directories={
              typeof props.data.directories !== "undefined"
                ? props.data.directories.length
                : 0
            }
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
              directories={
                typeof card.directories !== "undefined"
                  ? card.directories.length
                  : 0
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
                    : setSelectedTableCard(value)
                }
                label={card.name}
                icon={
                  Object.keys(card.info).length > 1
                    ? "files"
                    : Object.keys(card.info)[0]
                }
                directories={
                  typeof card.directories !== "undefined"
                    ? card.directories.length
                    : 0
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
                onClick={value => {
                  typeof card.directories !== "undefined" &&
                  card.directories.length > 0
                    ? props.setNavigation(props.navigation.concat(value))
                    : setSelectedTableCard(value);
                }}
                label={card.name}
                icon={
                  Object.keys(card.info).length > 1
                    ? "files"
                    : Object.keys(card.info)[0]
                }
                directories={
                  typeof card.directories !== "undefined"
                    ? card.directories.length
                    : 0
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
            directories={
              typeof props.data.directories !== "undefined"
                ? props.data.directories.length
                : 0
            }
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

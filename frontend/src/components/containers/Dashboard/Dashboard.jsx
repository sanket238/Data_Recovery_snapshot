import React, { Fragment } from "react";
import { Grid, Paper } from "@material-ui/core";
import Card from "../../ui/Card/Card";
import CommonChart from "../../charts/CommonChart/CommonChart";
import PieChart from "../../charts/PieChart/PieChart";
import Title from "../../ui/Title/Title";
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
import ExpandPanel from "../../ui/ExpandPanel/ExpandPanel";

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
  const [filterItem, setFilterItem] = React.useState("All Directories");
  const [panelData, setPanelData] = React.useState({});
  const [isLast, setIsLast] = React.useState(false);

  const getFileSize = (data, filetype) => {
    const size =
      data.directories.length > 0
        ? data.directories.map(data => {
            return data.directories.length > 0
              ? getFileSize(data, filetype)
              : typeof data.info[filetype] !== "undefined"
              ? data.totalSize
              : 0;
          })
        : [data.totalSize];
    return size.reduce((a, b) => a + b, 0);
  };

  const renderCards = data => {
    const len = props.activeItem.length;
    if (len === 0) {
      return (
        <Card
          style={{ cursor: "pointer" }}
          key={data.drive}
          onClick={value =>
            typeof data.directories !== "undefined" &&
            data.directories.length > 0
              ? (props.setNavigation(props.navigation.concat(data.drive)),
                props.setActiveItem(props.activeItem.concat(data)))
              : {}
          }
          label={data.drive}
          icon={"files"}
          directories={
            typeof data.directories !== "undefined"
              ? data.directories.length
              : 0
          }
          value={data.totalFiles}
        />
      );
    } else {
      return data.directories.length > 0 ? (
        data.directories.map((data, index) => {
          return (
            <Card
              style={
                typeof data.directories !== "undefined" && isLast === false
                  ? { cursor: "pointer" }
                  : {}
              }
              key={index}
              onClick={value => {
                if (
                  typeof data.directories !== "undefined" &&
                  data.directories.length === 0 &&
                  isLast === false
                ) {
                  setIsLast(true);
                  props.setNavigation(props.navigation.concat(value));
                  props.setActiveItem(props.activeItem.concat(data));
                }
                return typeof data.directories !== "undefined" &&
                  data.directories.length > 0
                  ? (props.setNavigation(props.navigation.concat(value)),
                    props.setActiveItem(props.activeItem.concat(data)))
                  : null;
              }}
              label={data.name}
              icon={"files"}
              directories={
                typeof data.directories !== "undefined"
                  ? data.directories.length
                  : 0
              }
              value={data.numberOfFiles}
            />
          );
        })
      ) : (
        <Card
          style={
            typeof data.directories !== "undefined" &&
            data.directories.length > 0 &&
            isLast === false
              ? { cursor: "pointer" }
              : {}
          }
          key={data.name}
          onClick={value => {}}
          label={data.name}
          icon={"files"}
          directories={
            typeof data.directories !== "undefined"
              ? data.directories.length
              : 0
          }
          value={data.numberOfFiles}
        />
      );
    }
  };

  const renderCharts = data => {
    let Columns = [
      { type: "string", label: "name" },
      { type: "number", label: "value" }
    ];

    let FormattedColumns = [
      { type: "string", label: "name" },
      { type: "number", label: "value" },
      { type: "string", role: "tooltip" }
    ];
    let datafiles = {};

    data.directories &&
      data.directories
        .filter(dir =>
          filterItem === "All Directories" ? true : dir.name === filterItem
        )
        .map(dir => {
          Object.keys(dir.info).map(data => {
            let field = datafiles[data];
            typeof field === "undefined"
              ? (datafiles[data] = {
                  name: data.charAt(0).toUpperCase() + data.slice(1),
                  files: dir.info[data],
                  size: getFileSize(dir, data)
                })
              : (datafiles[data] = {
                  name: data.charAt(0).toUpperCase() + data.slice(1),
                  files: field.files + dir.info[data],
                  size: field.size + getFileSize(dir, data)
                });
          });
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

    const dirList = data.directories
      ? data.directories.map(dir => dir.name)
      : [];

    let column = [],
      tableData = [];

    if (
      // props.activeItem.length > 0 &&
      // props.activeItem[props.activeItem.length - 1].directories.length === 0
      data.files &&
      data.files.length > 0
    ) {
      column = [
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

      tableData = data.files.map(data => {
        return {
          name: data.name,
          size: data.size,
          date: data.date,
          time: data.time
        };
      });
    }

    return (props.activeItem.length > 0 &&
      props.activeItem[props.activeItem.length - 1].directories.length ===
        0) === false ? (
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
        {data.files && data.files.length > 0 && (
          <Grid xs={12} md={6} lg={6} sm={6} item>
            <Paper elevation={3} style={{ padding: 15 }}>
              <div style={{ maxHeight: 440, overflowY: "auto" }}>
                <MaterialTable
                  icons={tableIcons}
                  title={
                    <Title
                      title={
                        props.navigation[props.navigation.length - 1] + " Files"
                      }
                    />
                  }
                  columns={column}
                  data={tableData}
                />
              </div>
            </Paper>
          </Grid>
        )}
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
    ) : (
      <Fragment>
        <div style={{ display: "flex", width: "100%", padding: 15 }}>
          <Title title={"Overview"} />
        </div>
        <Grid xs={12} md={6} lg={6} sm={6} item>
          <Paper elevation={3} style={{ padding: 15 }}>
            <div style={{ maxHeight: 440, overflowY: "auto" }}>
              <MaterialTable
                icons={tableIcons}
                title={
                  <Title
                    title={
                      props.navigation[props.navigation.length - 1] + " Files"
                    }
                  />
                }
                columns={column}
                data={tableData}
              />
            </div>
          </Paper>
        </Grid>
      </Fragment>
    );
  };

  const renderCard = data => {
    return (
      <Card
        style={{}}
        key={data.drive ? data.drive : data.name}
        onClick={value => {}}
        label={data.drive ? data.drive : data.name}
        icon={"files"}
        directories={
          typeof data.directories !== "undefined" ? data.directories.length : 0
        }
        value={data.totalFiles ? data.totalFiles : data.numberOfFiles}
        size={data.totalSize}
      />
    );
  };

  return (
    <div>
      {props.activeItem.length === 0 ? (
        <Fragment>
          <Grid container spacing={3} item>
            {renderCard(
              props.activeItem.length === 0 ? props.data : props.activeItem
            )}
          </Grid>
          <Grid container style={{ marginTop: 25 }} spacing={3} item>
            <Grid item xs={12}>
              <ExpandPanel
                onPanelClick={data => {
                  setPanelData(data);
                  props.setNavigation(
                    props.navigation.concat(data.drive ? data.drive : data.name)
                  );
                  props.setActiveItem(props.activeItem.concat(data));
                }}
                data={props.data !== 0 ? props.data : {}}
              />
            </Grid>
          </Grid>
        </Fragment>
      ) : (
        <Fragment>
          <Grid container spacing={3} item>
            {renderCard(
              props.activeItem.length === 0
                ? props.data
                : props.activeItem[props.activeItem.length - 1]
            )}
          </Grid>
          <Grid container style={{ marginTop: 25 }} spacing={3} item>
            {renderCharts(
              props.activeItem.length === 0
                ? props.data
                : props.activeItem[props.activeItem.length - 1]
            )}
          </Grid>
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;

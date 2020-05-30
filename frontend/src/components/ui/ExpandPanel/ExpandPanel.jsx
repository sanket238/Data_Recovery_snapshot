import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Paper } from "@material-ui/core";
import { Folder } from "@material-ui/icons";
import { formatBytes } from "../../../utils/utils";
import Table from "../Table/Table";

const ExpansionPanel = withStyles({
  root: {
    // border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:first-child": {
      borderRadius: "10px 10px 0px 0px"
    },
    "&:last-child": {
      borderRadius: "0px 0px 10px 10px"
    },
    "&:before": {
      display: "none"
    },
    "&$expanded": {
      margin: "auto"
    }
  },
  expanded: {}
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    // backgroundColor: "rgba(0, 0, 0, .03)",
    // borderBottom: "1px solid rgba(0, 0, 0, .125)",
    // marginBottom: -1,
    flexDirection: "row-reverse",
    padding: 0,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56
    }
  },
  content: {
    margin: "12px 16px",
    "&$expanded": {
      margin: "12px 16px"
    }
  },
  expanded: {}
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiExpansionPanelDetails);

const ExpandPanel = props => {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const renderPanel = (data, index) => {
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

    const tableData =
      data.files.length > 0
        ? data.files.map(data => {
            return {
              name: data.name,
              size: data.size,
              date: data.date,
              time: data.time
            };
          })
        : [];
    return (
      <ExpansionPanel key={index} square>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={index + "-content"}
          id={index + "-header"}
          onClick={() => props.onPanelClick(data)}
        >
          <Typography>
            <span>
              <Folder
                style={{
                  marginBottom: -5,
                  marginRight: 15,
                  color: "#5e7ff5"
                }}
              />
            </span>
            {data.name}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div style={{ width: "100%" }}>
            {data.directories.length > 0 &&
              data.directories.map((data, index) => {
                return renderPanel(data, index);
              })}
            {data.files.length > 0 && (
              <Table title="" column={column} data={tableData} />
            )}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  };

  return (
    <div>
      <Paper style={{ borderRadius: 10 }}>
        {props.data.length !== 0 && (
          <ExpansionPanel
            style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
            key={props.data.drive}
            square
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={props.data.drive + "-content"}
              id={props.data.drive + "-header"}
              onClick={() => props.onPanelClick(props.data)}
            >
              <Typography>
                <span>
                  <Folder
                    style={{
                      marginBottom: -5,
                      marginRight: 15,
                      color: "#5e7ff5"
                    }}
                  />
                </span>
                {props.data.drive}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div style={{ width: "100%" }}>
                {props.data.length !== 0 &&
                  props.data.directories.map((data, index) => {
                    return renderPanel(data, index);
                  })}
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )}
      </Paper>
    </div>
  );
};

export default ExpandPanel;

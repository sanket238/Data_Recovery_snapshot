import React from "react";
import { Paper, Chip, CircularProgress, Button } from "@material-ui/core";
import { Folder } from "@material-ui/icons";
import CallMadeIcon from "@material-ui/icons/CallMade";
import Collapsible from "react-collapsible";
import { formatBytes } from "../../../utils/utils";
import Table from "../Table/Table";
import "./ExpandPanel.css";

const ExpandPanel = props => {
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
      <Collapsible
        key={data.name}
        trigger={
          <div className="collapse">
            <div>
              <div style={{ fontSize: 16, fontWeight: "bold", color: "grey" }}>
                <span>
                  <Folder
                    style={{
                      marginBottom: -5,
                      marginRight: 15,
                      color: "#5e7ff5"
                    }}
                  />
                </span>
                <span>{data.name}</span>
                <Chip
                  onClick={() => props.onPanelClick(data)}
                  style={{ marginLeft: 25 }}
                  size="small"
                  label="View Details"
                  clickable
                  color="primary"
                  onDelete={() => props.onPanelClick(data)}
                  deleteIcon={<CallMadeIcon style={{ marginRight: 10 }} />}
                />
              </div>
            </div>
            <div className="expandpanel-values">
              <span>{formatBytes(data.totalSize)}</span>
              <span>{data.numberOfFiles} Files</span>
            </div>
          </div>
        }
      >
        <div className="collapse-subcontainer">
          {data.directories.length > 0 &&
            data.directories.map((data, index) => {
              return renderPanel(data, index);
            })}
          <div className="collapse-table">
            {data.files.length > 0 && (
              <Table title="" column={column} data={tableData} />
            )}
          </div>
          {data.files.length > 0 && (
            <div className="collapse-details-button">
              <Button
                onClick={() => props.onPanelClick(data)}
                variant="contained"
                color="primary"
                size="small"
              >
                View Details
              </Button>
            </div>
          )}
        </div>
      </Collapsible>
    );
  };

  return (
    <div className="ExpandPanel" style={{ width: "100%" }}>
      <Paper style={{ borderRadius: 10, padding: 15 }}>
        {props.data.length !== 0 ? (
          <Collapsible
            trigger={
              <div className="collapse">
                <div>
                  <div
                    style={{ fontSize: 16, fontWeight: "bold", color: "grey" }}
                  >
                    <span>
                      <Folder
                        style={{
                          marginBottom: -5,
                          marginRight: 15,
                          color: "#5e7ff5"
                        }}
                      />
                    </span>
                    <span>{props.data.drive}</span>
                    <Chip
                      onClick={() => props.onPanelClick(props.data)}
                      style={{ marginLeft: 25 }}
                      size="small"
                      label="View Details"
                      clickable
                      color="primary"
                      onDelete={() => props.onPanelClick(props.data)}
                      deleteIcon={<CallMadeIcon style={{ marginRight: 10 }} />}
                    />
                  </div>
                </div>
                <div className="expandpanel-values">
                  <span>{formatBytes(props.data.totalSize)}</span>
                  <span>{props.data.totalFiles} Files</span>
                </div>
              </div>
            }
          >
            <div className="collapse-subcontainer">
              {props.data.length !== 0 &&
                props.data.directories.map((data, index) => {
                  return renderPanel(data, index);
                })}
            </div>
          </Collapsible>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 100
            }}
          >
            <CircularProgress />
          </div>
        )}
      </Paper>
    </div>
  );
};

export default ExpandPanel;

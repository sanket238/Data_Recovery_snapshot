import React from "react";
import { Grid, Paper, CircularProgress } from "@material-ui/core";
import {
  VideoLibrary,
  Image,
  DevicesOther,
  Folder,
  Audiotrack,
  Assignment,
  Description,
  PictureAsPdf
} from "@material-ui/icons";
import "./Card.css";
import { formatBytes } from "../../../utils/utils";

const Card = props => {
  let images = {
    files: <Folder fontSize={"large"} />,
    image: <Image fontSize={"large"} />,
    audio: <Audiotrack fontSize={"large"} />,
    ppt: <Assignment fontSize={"large"} />,
    word: <Description fontSize={"large"} />,
    excel: <Description fontSize={"large"} />,
    pdf: <PictureAsPdf fontSize={"large"} />,
    other: <DevicesOther fontSize={"large"} />,
    video: <VideoLibrary fontSize={"large"} />
  };

  let classNames = {
    files: "card-icon-files",
    image: "card-icon-img",
    audio: "card-icon-audio",
    ppt: "card-icon-ppt",
    word: "card-icon-word",
    excel: "card-icon-excel",
    pdf: "card-icon-pdf",
    other: "card-icon-other",
    video: "card-icon-video"
  };

  return (
    <Grid item xs={12} md={6} lg={4} sm={6}>
      {props.label ? (
        <Paper
          elevation={3}
          style={props.style ? props.style : {}}
          onClick={() => props.onClick(props.label)}
          className="dashboard-card"
        >
          <div className="card-padding">
            <div className={classNames[props.icon]}>{images["files"]}</div>
            <div style={{ marginTop: 15 }}>
              <label className="card-label">{props.label}</label>
            </div>
            <div className="card-number">
              {/* <label className="card-number-label">{props.value}</label> */}
              <div
                style={{ fontSize: 18, fontWeight: "bold", color: "grey" }}
              ></div>
              <div style={{ fontSize: 16, fontWeight: "bold", color: "grey" }}>
                {props.value} Files and {props.directories} Sub Folders
              </div>
              {typeof props.size !== "undefined" ? (
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "grey",
                    marginTop: 10
                  }}
                >
                  {formatBytes(props.size)} Recovered
                </div>
              ) : null}
            </div>
          </div>
        </Paper>
      ) : (
        <Paper
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 180
          }}
        >
          <CircularProgress />
        </Paper>
      )}
    </Grid>
  );
};

export default Card;

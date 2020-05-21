import React from "react";
import { Grid, Paper } from "@material-ui/core";
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
    <Grid item xs={12} md={6} lg={3} sm={6}>
      <Paper
        elevation={3}
        style={props.style ? props.style : {}}
        onClick={() => props.onClick(props.label)}
        className="dashboard-card"
      >
        <div className="card-padding">
          <div className={classNames[props.icon]}>{images[props.icon]}</div>
          <div className="card-number">
            <label className="card-number-label">{props.value}</label>
            <div style={{ fontSize: 18, fontWeight: "bold", color: "grey" }}>
              Files
            </div>
            <div style={{ fontSize: 18, fontWeight: "bold", color: "grey" }}>
              ( {props.directories} Directories )
            </div>
          </div>
          <div>
            <label className="card-label">{props.label}</label>
          </div>
        </div>
      </Paper>
    </Grid>
  );
};

export default Card;

import React from "react";
import { Grid, Card as MaterialCard } from "@material-ui/core";
import {
  VideoLibrary,
  Image,
  DevicesOther,
  Folder,
  InsertDriveFile,
} from "@material-ui/icons";
import "./Card.css";

const Card = (props) => {
  let images = {
    Files: <Folder fontSize={"large"} />,
    Image: <Image fontSize={"large"} />,
    Other: <DevicesOther fontSize={"large"} />,
    Video: <VideoLibrary fontSize={"large"} />,
    Document: <InsertDriveFile fontSize={"large"} />,
  };

  let classNames = {
    Files: "card-icon-video",
    Image: "card-icon-img",
    Other: "card-icon-other",
    Video: "card-icon-video",
    Document: "card-icon-document",
  };

  return (
    <Grid item xs={12} sm={3}>
      <MaterialCard className="dashboard-card">
        <div className="card-padding">
          <div className={classNames[props.icon]}>{images[props.icon]}</div>
          <div className="card-number">
            <label className="card-number-label">{props.value}</label>
          </div>
          <div>
            <label className="card-label">{props.label}</label>
          </div>
        </div>
      </MaterialCard>
    </Grid>
  );
};

export default Card;

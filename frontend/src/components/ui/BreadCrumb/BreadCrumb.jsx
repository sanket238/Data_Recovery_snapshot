import React from "react";
import { emphasize, withStyles } from "@material-ui/core/styles";
import { Breadcrumbs, Chip } from "@material-ui/core";
import { Folder, NavigateNext, Home } from "@material-ui/icons";

const StyledBreadcrumb = withStyles(theme => ({
  root: {
    backgroundColor: "#e5f3fe",
    fontSize: 14,
    fontWeight: 700,
    border: "2px solid",
    "&:hover": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12)
    }
  }
}))(Chip);

export default function BreadCrumb(props) {
  return (
    <Breadcrumbs separator={<NavigateNext />} aria-label="breadcrumb">
      <StyledBreadcrumb
        label="Home"
        icon={<Home fontSize="small" />}
        onClick={() => props.handleClick(0)}
      />
      {props.data.map((item, index) => {
        return (
          <StyledBreadcrumb
            key={index}
            component="a"
            label={item}
            icon={<Folder fontSize="small" />}
            onClick={() => props.handleClick(index + 1)}
          />
        );
      })}
    </Breadcrumbs>
  );
}

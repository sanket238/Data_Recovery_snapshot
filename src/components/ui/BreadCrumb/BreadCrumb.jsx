import React from "react";
import { emphasize, withStyles } from "@material-ui/core/styles";
import { Breadcrumbs, Chip } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { Folder, NavigateNext } from "@material-ui/icons";

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: "#e5f3fe",
    fontSize: 14,
    fontWeight: 700,
    border: "2px solid",
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip);

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function BreadCrumb() {
  return (
    <Breadcrumbs separator={<NavigateNext />} aria-label="breadcrumb">
      <StyledBreadcrumb
        component="a"
        href="#"
        label="Home"
        icon={<HomeIcon fontSize="small" />}
        onClick={handleClick}
      />
      <StyledBreadcrumb
        component="a"
        href="#"
        label="D://"
        icon={<Folder fontSize="small" />}
        onClick={handleClick}
      />
    </Breadcrumbs>
  );
}

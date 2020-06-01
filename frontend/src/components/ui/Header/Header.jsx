import React, { Fragment } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Menu,
  MenuItem,
  Divider
} from "@material-ui/core";
import clsx from "clsx";
import { Menu as MenuIcon, AccountCircle } from "@material-ui/icons";
import { withRouter } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  headerClass: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between"
  },
  headerClassH6: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  profileMenu: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    padding: 12
  },
  hide: {
    display: "none"
  }
}));

const Header = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <div className={classes.profileMenu}>
        <Typography variant="inherit" noWrap>
          {localStorage.getItem("name")}
        </Typography>
      </div>
      <Divider />
      <MenuItem
        onClick={() => {
          props.setNavigation(["Profile"]);
          handleMenuClose();
          props.history.push("/profile");
        }}
      >
        Profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          localStorage.setItem("isLoggedIn", false);
          props.history.push("/signin");
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Fragment>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: props.open
        })}
      >
        <Toolbar>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: props.open
            })}
          >
            <MenuIcon />
          </IconButton> */}
          <div className={classes.headerClass}>
            <Typography
              style={{ cursor: "pointer" }}
              onClick={() => (props.history.push("/"), props.setHome())}
              className={classes.headerClassH6}
              variant="h6"
              noWrap
            >
              {props.title}
            </Typography>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Fragment>
  );
};

export default withRouter(Header);

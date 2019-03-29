import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AppsIcon from "@material-ui/icons/Apps"

import { logout } from "../../../modules/session/thunks";
import { isLoggedIn as _isLoggedIn } from "../../../modules/session/selectors";
import paths from "../../../pages/paths";

const styles = theme => {
  return {
    menu: {
      top: theme.spacing.unit * 4
    },
    appbar: {
      top: 0,
      backgroundColor: theme.palette.background.paper
    },
    title: {
      flexGrow: 1,
      color: theme.palette.text.primary
    },
    buttonAsText: {
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2
    }
  };
};

class NavbarAuth extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    title: PropTypes.string.isRequired
  };

  state = {
    isUserMenuOpened: null,
    isAppMenuOpened: null
  };

  handleOpenUserMenu = event => {
    this.setState({ isUserMenuOpened: event.currentTarget });
  };

  handleCloseUserMenu = () => {
    this.setState({ isUserMenuOpened: null });
  };

  handleOpenAppMenu = event => {
    this.setState({ isAppMenuOpened: event.currentTarget });
  };

  handleCloseAppMenu = () => {
    this.setState({ isAppMenuOpened: null });
  };

  handleLogout = async () => {
    try {
      await this.props.logout();
      this.props.history.push(paths.LOGIN);
    } catch (error) {}
  };

  renderNotLoggedInMenu() {
    const { isLoggedIn, classes } = this.props;
    return isLoggedIn ? null : (
      <div>
        <Button
          color="inherit"
          className={classes.buttonAsText}
          component={Link}
          to={paths.ERROR_404}
        >
          Daftar
        </Button>
        <Button
          color="inherit"
          className={classes.buttonAsText}
          component={Link}
          to={paths.LOGIN}
        >
          Masuk
        </Button>
      </div>
    );
  }

  renderAppMenu() {
    const { isLoggedIn, classes } = this.props;
    const open = Boolean(this.state.isAppMenuOpened);
    return isLoggedIn ? (
      <div>
        <IconButton
          aria-owns={open ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={this.handleOpenAppMenu}
          color="inherit"
        >
          <AppsIcon />
        </IconButton>
        {/* @todo: buat custom menu */}
        <Menu
          id="menu-appbar"
          isUserMenuOpened={open}
          className={classes.menu}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={this.handleCloseAppMenu}
        >
          <MenuItem>Channel</MenuItem>
          <MenuItem>Donasi</MenuItem>
        </Menu>
      </div>
    ) : null;
  }

  renderUserMenu() {
    const { isLoggedIn, classes } = this.props;
    const open = Boolean(this.state.isUserMenuOpened);
    return isLoggedIn ? (
      <div>
        <IconButton
          aria-owns={open ? "menu-userbar" : undefined}
          aria-haspopup="true"
          onClick={this.handleOpenUserMenu}
          color="inherit"
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          id="menu-userbar"
          isUserMenuOpened={open}
          className={classes.menu}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={this.handleCloseUserMenu}
        >
          <MenuItem onClick={this.handleCloseUserMenu}>Profil</MenuItem>
          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    ) : null;
  }

  render() {
    const { classes, title } = this.props;
    return (
      <AppBar position="sticky" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.title}>
            {title}
          </Typography>
          {this.renderNotLoggedInMenu()}
          {this.renderAppMenu()}
          {this.renderUserMenu()}
        </Toolbar>
      </AppBar>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({
    isLoggedIn: _isLoggedIn(state)
  });

  const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
  });

  return withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(withStyles(styles)(NavbarAuth))
  );
}

export default createContainer();

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
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AppsIcon from "@material-ui/icons/Apps";

import { logout } from "../../../modules/session/thunks";
import { isLoggedIn as _isLoggedIn } from "../../../modules/session/selectors";
import paths from "../../../pages/paths";
import Logo from "../../../assets/logo.svg";
import { Guidelines } from "../../../styles";

const styles = theme => {
  return {
    logo: {
      [theme.breakpoints.down('sm')]: {
        width: 96,
      }
    },
    menu: {
      marginTop: theme.spacing.unit * 6
    },
    menuItem: {
      width: 160
    },
    appMenu: {
      minHeight: 90,
      maxWidth: "auto",
      maxHeight: "auto",
      overflowY: "hidden"
    },
    appMenuItem: {
      width: 52,
      height: 52,
      ...Guidelines.layouts.flexMiddle,
      ...Guidelines.layouts.flexDirCol
    },
    appbar: {
      top: 0,
      backgroundColor: theme.palette.background.paper,
      boxShadow: "None"
    },
    title: {
      flexGrow: 1,
      color: theme.palette.text.primary,
      marginLeft: theme.spacing.unit * 4
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
    title: PropTypes.string,
    position: PropTypes.string
  };

  static defaultProps = {
    title: "",
    position: "sticky"
  };

  state = {
    anchorElUserMenu: null,
    anchorElAppMenu: null
  };

  handleOpenUserMenu = event => {
    this.setState({ anchorElUserMenu: event.currentTarget });
  };

  handleCloseUserMenu = () => {
    this.setState({ anchorElUserMenu: null });
  };

  handleOpenAppMenu = event => {
    this.setState({ anchorElAppMenu: event.currentTarget });
  };

  handleCloseAppMenu = () => {
    this.setState({ anchorElAppMenu: null });
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
      <div style={{ display: "flex", flexWrap: "nowrap" }}>
        <Button
          className={classes.buttonAsText}
          component={Link}
          to={paths.REGISTER}
        >
          Daftar
        </Button>
        <Button
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
    const { anchorElAppMenu } = this.state;
    const open = Boolean(anchorElAppMenu);
    return isLoggedIn ? (
      <div>
        <IconButton
          aria-owns={open ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={this.handleOpenAppMenu}
        >
          <AppsIcon />
        </IconButton>
        {/* @todo: buat custom menu */}
        <Menu
          id="menu-appbar"
          anchorEl={anchorElAppMenu}
          classes={{
            paper: `${classes.menu} ${classes.appMenu}`
          }}
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
          <Grid container spacing={24}>
            <Grid item xs={4}>
              <MenuItem
                className={classes.appMenuItem}
                component={Link}
                to={paths.HOME}
              >
                <AccountCircleIcon fontSize="large" />
                <Typography>Akun</Typography>
              </MenuItem>
            </Grid>
            <Grid item xs={4}>
              <MenuItem
                className={classes.appMenuItem}
                component={Link}
                to={paths.CHANNEL}
              >
                <AccountCircleIcon fontSize="large" />
                <Typography>Channel</Typography>
              </MenuItem>
            </Grid>
            <Grid item xs={4}>
              <MenuItem
                className={classes.appMenuItem}
                component={Link}
                to={paths.DONASI}
              >
                <AccountCircleIcon fontSize="large" />
                <Typography>Donasi</Typography>
              </MenuItem>
            </Grid>
          </Grid>
        </Menu>
      </div>
    ) : null;
  }

  renderUserMenu() {
    const { isLoggedIn, classes } = this.props;
    const { anchorElUserMenu } = this.state;
    const open = Boolean(anchorElUserMenu);
    return isLoggedIn ? (
      <div>
        <IconButton
          aria-owns={open ? "menu-userbar" : undefined}
          aria-haspopup="true"
          onClick={this.handleOpenUserMenu}
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          id="menu-userbar"
          anchorEl={anchorElUserMenu}
          classes={{
            paper: classes.menu
          }}
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
          <MenuItem
            className={classes.menuItem}
            component={Link}
            to={paths.USER_PROFILE}
          >
            Profil
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            component={Link}
            to={paths.USER_PREFERENCE}
          >
            Preferensi
          </MenuItem>
          <MenuItem className={classes.menuItem} onClick={this.handleLogout}>
            Keluar
          </MenuItem>
        </Menu>
      </div>
    ) : null;
  }

  render() {
    const { classes, title, position } = this.props;
    return (
      <AppBar position={position} className={classes.appbar}>
        <Toolbar>
          <Button
            component={Link}
            to="/"
            disableRipple
            className={classes.menuButton}
            aria-label="Menu"
          >
            <img src={Logo} alt="ILUNI12 Logo" className={classes.logo} />
          </Button>
          <Typography variant="h6" className={classes.title}>
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

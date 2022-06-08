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
import icons from "../../../assets/icons";
import AppsIcon from "@material-ui/icons/Apps";

import { logout } from "../../../modules/session/thunks";
import { GROUPS } from "../../../modules/session";
import {
  isLoggedIn as _isLoggedIn,
  getUser,
  selectCurrentUserGroups,
} from "../../../modules/session/selectors";
import paths from "../../../pages/paths";
import Logo from "../../../assets/logo.svg";
import { Guidelines } from "../../../styles";
import config, { METABASE_URL } from "../../../config";

const styles = theme => {
  return {
    logo: {
      [theme.breakpoints.down("sm")]: {
        width: 96,
      },
    },
    menu: {
      marginTop: theme.spacing.unit * 6,
    },
    menuItem: {
      width: 160,
    },
    appMenu: {
      minHeight: 90,
      width: 360,
      padding: 8,
      maxHeight: "auto",
      overflowY: "hidden",
    },
    menulist: {
      padding: 0,
      ...Guidelines.layouts.flexDirRow,
      ...Guidelines.layouts.flexWrap,
      ...Guidelines.layouts.flexSpaceBetweenMiddle
    },
    appMenuItem: {
      width: 88,
      height: 88,
      ...Guidelines.layouts.flexMiddle,
      ...Guidelines.layouts.flexDirCol,
    },
    appbar: {
      top: 0,
      backgroundColor: "#fff !important",
      boxShadow: "None",
    },
    title: {
      flexGrow: 1,
      color: theme.palette.text.primary,
      marginLeft: theme.spacing.unit * 4,
    },
    buttonAsText: {
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2,
    },
  };
};

class NavbarAuth extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    title: PropTypes.string,
    position: PropTypes.string,
  };

  static defaultProps = {
    title: "",
    position: "sticky",
  };

  state = {
    anchorElUserMenu: null,
    anchorElAppMenu: null,
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

  renderAppMenuHeliosMenu() {
    const { classes, groups, user } = this.props;
    return (
      (user.isSuperuser ||
        groups.findIndex(
          g =>
            g === GROUPS.MANAGEMENT ||
            GROUPS.ADMIN_CHANNEL ||
            GROUPS.ADMIN_DONATION
        ) > -1) && (
        <React.Fragment>
          <a href={config.HELIOS+"/id/__admin__/"} target="_blank" rel="noopener noreferrer">
          <MenuItem
            className={classes.appMenuItem}
          >
            <img src={icons.adminHelios} alt="Account Icon" />
            <Typography>Adm. Helios</Typography>
          </MenuItem>
          </a>
        </React.Fragment>
      )
    );
  }

  renderAppMenuAtlasMenu() {
    const { classes, groups, user } = this.props;
    return (
      (user.isSuperuser ||
        groups.findIndex(g => g === GROUPS.ADMIN_USER) > -1) && (
        <React.Fragment>
          <a href={config.ATLAS+"/id/__admin__/"} target="_blank" rel="noopener noreferrer">
          <MenuItem
            className={classes.appMenuItem}
          >
            <img src={icons.adminAtlas} alt="Account Icon" />
            <Typography>Adm. Atlas</Typography>
          </MenuItem>
          </a>
        </React.Fragment>
      )
    );
  }

  renderAdminAppMenuItems() {
    const { classes, user } = this.props;
    return user.isStaff || user.isSuperuser ? (
      <React.Fragment>
        <a href={METABASE_URL} target="_blank" rel="noopener noreferrer">
          <MenuItem className={classes.appMenuItem}>
            <img src={icons.dashboard} alt="Account Icon" />
            <Typography>Dashboard</Typography>
          </MenuItem>
        </a>
        <MenuItem
          className={classes.appMenuItem}
          component={Link}
          to={paths.GENERATE_USER}
        >
          <img src={icons.generateUser} alt="Account Icon" />
          <Typography>Generate User</Typography>
        </MenuItem>
        <MenuItem
          className={classes.appMenuItem}
          component={Link}
          to={paths.CRM}
        >
          <img src={icons.emailBlast} alt="Account Icon" />
          <Typography>Email Blaster</Typography>
        </MenuItem>
        <MenuItem
          className={classes.appMenuItem}
          component={Link}
          to={paths.CRM_CONTACT}
        >
          <img src={icons.kontak} alt="Account Icon" />
          <Typography>Kontak</Typography>
        </MenuItem>
      </React.Fragment>
    ) : null;
  }

  renderPencarianAlumniMenu() {
    const { classes, user } = this.props;
    return (
      (user.isStaff || user.isSuperuser || user.isVerified) && (
        <React.Fragment>
          <MenuItem
            className={classes.appMenuItem}
            component={Link}
            to={paths.ALUMNI_SEARCH}
          >
            <img src={icons.search} alt="Account Icon" />
            <Typography>Pencarian Alumni</Typography>
          </MenuItem>
        </React.Fragment>
      )
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
        <Menu
          id="menu-appbar"
          anchorEl={anchorElAppMenu}
          classes={{
            paper: `${classes.menu} ${classes.appMenu}`,
          }}
          MenuListProps={{
            className: classes.menulist,
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={this.handleCloseAppMenu}
        >
          <MenuItem
            className={classes.appMenuItem}
            component={Link}
            to={paths.HOME}
          >
            <img src={icons.akun} alt="Account Icon" />
            <Typography>Akun</Typography>
          </MenuItem>

          <MenuItem
            className={classes.appMenuItem}
            component={Link}
            to={paths.CHANNEL}
          >
            <img src={icons.channel} alt="Channel Icon" />
            <Typography>Channel</Typography>
          </MenuItem>

          {this.renderPencarianAlumniMenu()}
          {this.renderAdminAppMenuItems()}
          {this.renderAppMenuAtlasMenu()}
          {this.renderAppMenuHeliosMenu()}
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
            paper: classes.menu,
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
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
    const { classes, title, position, isLoggedIn } = this.props;
    return (
      <AppBar position={position} className={classes.appbar}>
        <Toolbar disableGutters>
          <Button
            component={Link}
            to={isLoggedIn ? paths.HOME : paths.LANDING}
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
    user: getUser(state),
    isLoggedIn: _isLoggedIn(state),
    groups: selectCurrentUserGroups(state),
  });

  const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
  });

  return withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(withStyles(styles)(NavbarAuth))
  );
}

export default createContainer();

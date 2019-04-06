import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import {
  isLoggedIn as _isLoggedIn,
  getUser
} from "../../modules/session/selectors";

import { withStyles } from "@material-ui/core/styles";
import AccessTimeIcon from "@material-ui/icons/AccessTimeOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import GroupWorkIcon from "@material-ui/icons/GroupWorkOutlined";

import { withAuth } from "../../components/hocs/auth";
import { NavbarAuth, NavbarBack } from "../../components/stables/Navbar";
import RouterWithMenu from "../../components/RouterWithMenu";

import HeaderComponent from "./HeaderComponent";
import ProfileComponent from "./ProfilePage";
import ChannelComponent from "./ListChannelPage";
import Timeline from "./Timeline";

import { layouts } from "../../styles/guidelines";

const styles = theme => ({
  container: {
    ...layouts.mt32
  }
});

const ROUTES = [
  {
    title: "Daftar Channel",
    menu: {
      Icon: GroupWorkIcon,
      path: "/channels"
    },
    route: {
      exact: true,
      path: "/",
      component: ChannelComponent
    }
  },
  {
    title: "Timeline",
    menu: {
      Icon: AccessTimeIcon,
      path: "/channels/timeline"
    },
    route: {
      path: "/timeline",
      component: () => <Timeline />
    }
  },
  {
    title: "User Channel",
    menu: {
      Icon: AccountCircleIcon,
      path: "/channels/users/:username"
    },
    route: {
      path: "/users/:username",
      component: () => <ProfileComponent/>
    }
  }
];

class Screen extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  };

  renderHeader = () => {
    const { user } = this.props;
    return <HeaderComponent name={user.name} lastName={user.lastName} />;
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <NavbarAuth />
        <NavbarBack />
        <div className={classes.container}>
          <RouterWithMenu
            paths={ROUTES}
            MenuHeaderComponent={this.renderHeader}
          />
        </div>
      </React.Fragment>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({
    isLoggedIn: _isLoggedIn(state),
    user: getUser(state)
  });

  const mapDispatchToProps = dispatch => ({});

  return withAuth(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(withStyles(styles)(Screen))
    )
  );
}

export default createContainer();

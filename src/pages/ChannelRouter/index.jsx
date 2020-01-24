import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import {
  isLoggedIn as _isLoggedIn,
  getUser,
} from "../../modules/session/selectors";

import { withStyles } from "@material-ui/core/styles";
import AccessTimeIcon from "@material-ui/icons/AccessTimeOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import GroupWorkIcon from "@material-ui/icons/GroupWorkOutlined";

import { withAuth } from "../../components/hocs/auth";
import {
  NavbarAuth,
  NavbarBackWithChannelRequest,
} from "../../components/stables/Navbar";
import RouterWithMenu from "../../components/RouterWithMenu";
import { Container } from "../../components/Container";
import Particle from "../../components/Particle";

import HeaderComponent from "./HeaderComponent";
import ProfileComponent from "./ProfilePage";
import ChannelComponent from "./ListChannelPage";
import Timeline from "./Timeline";

import { layouts } from "../../styles/guidelines";
import { makePathVariableUri } from "../../libs/navigation";
import heliosV1 from "../../modules/api/helios/v1";
import { LoadingFill } from "../../components/Loading";
import paths from "../../pages/paths";

const styles = theme => ({
  container: {
    ...layouts.mt32,
  },
});

const ROUTES = [
  {
    title: "Daftar Channel",
    menu: {
      Icon: GroupWorkIcon,
      path: "/channels",
    },
    route: {
      exact: true,
      path: "/",
      component: ChannelComponent,
    },
  },
  {
    title: "Timeline",
    menu: {
      Icon: AccessTimeIcon,
      path: "/channels/timeline",
    },
    route: {
      path: "/timeline",
      component: Timeline,
    },
  },
  {
    title: "Chant Pribadi",
    menu: {
      Icon: AccountCircleIcon,
      path: "/channels/users/:username",
    },
    route: {
      path: "/users/:username",
      component: ProfileComponent,
    },
  },
];

function getRoutes(user) {
  return ROUTES.map(r => {
    if (r.route.path.includes(":username")) {
      const route = {
        ...r.route,
      };
      route.path = makePathVariableUri(route.path, {
        username: user.username,
      });
      const menu = {
        ...r.menu,
      };
      menu.path = makePathVariableUri(menu.path, {
        username: user.username,
      });

      return {
        ...r,
        route,
        menu,
      };
    }
    return r;
  });
}

class Screen extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
  };

  state = {
    numberOfChants: 0,
    isLoading: true,
  };

  componentDidMount() {
    heliosV1.channel.getNumberOfChantsUser().then(result => {
      this.setState({
        numberOfChants: result.data.numberOfChants,
        isLoading: false,
      });
    });
  }

  renderHeader = () => {
    const { user } = this.props;
    const { numberOfChants } = this.state;
    return (
      <HeaderComponent
        title={user.name}
        profilePicUrl={user.profile.profilePicUrl}
        numberOfChants={numberOfChants}
      />
    );
  };

  render() {
    const { user, classes } = this.props;
    const { isLoading } = this.state;
    return (
      <React.Fragment>
        <NavbarAuth />
        <NavbarBackWithChannelRequest ButtonProps={{ href: paths.HOME }} />
        <Particle name="cloud2" left={0} top={160} />
        <Particle name="cloud1" right={0} bottom={160} />
        <Container className={classes.container}>
          {isLoading ? (
            <LoadingFill />
          ) : (
            <RouterWithMenu
              paths={getRoutes(user)}
              MenuHeaderComponent={this.renderHeader}
            />
          )}
        </Container>
      </React.Fragment>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({
    isLoggedIn: _isLoggedIn(state),
    user: getUser(state),
  });

  return withAuth(
    withRouter(connect(mapStateToProps)(withStyles(styles)(Screen)))
  );
}

export default createContainer();

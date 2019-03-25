import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Fade from "@material-ui/core/Fade";

import { checkUserSession } from "../../modules/session/thunks";
import { isLoggedIn as _isLoggedIn } from "../../modules/session/selectors";
import { isOnline } from "../../libs/navigation";
import { isClientError } from "../../libs/response";
import { LOGIN } from "../../pages/paths";

import { SplashScreen } from "../Loading";

class Authenticated extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    load: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
    location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
    history: PropTypes.shape({ push: PropTypes.func }).isRequired
  };

  state = {
    isLoading: true
  };

  componentDidMount() {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      this.redirectToLogin();
    } else {
      this.stopLoading();
    }
  }

  componentWillUnmount() {
    if (this.loadingTimeout) {
      clearTimeout(this.loadingTimeout);
    }
  }

  stopLoading = () => {
    this.loadingTimeout = setTimeout(() => {
      this.setState({ isLoading: false }, () => {
        clearTimeout(this.loadingTimeout);
      });
    }, 750);
  };

  redirectToLogin = () => {
    const { history, location } = this.props;
    history.push(`${LOGIN}?redirect=${location.pathname}`);
  };

  handleLoad() {
    const { load } = this.props;
    load()
      .catch(e => {
        if (isOnline && isClientError(e.response)) {
          this.redirectToLogin();
        }
      })
      .then(() => this.stopLoading());
  }

  render() {
    const { render } = this.props;
    const { isLoading } = this.state;
    if (isLoading) {
      return <SplashScreen />;
    }
    return <Fade>{render()}</Fade>;
  }
}

function createContainer() {
  const mapStateToProps = state => ({
    isLoggedIn: _isLoggedIn(state)
  });

  const mapDispatchToProps = dispatch => ({
    load: () => dispatch(checkUserSession())
  });

  return withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Authenticated)
  );
}
export function withAuth(Component) {
  const Wrapper = createContainer();
  return props => <Wrapper render={() => <Component {...props} />} />;
}

export default {
  withAuth
};

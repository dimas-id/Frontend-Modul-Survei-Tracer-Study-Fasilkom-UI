import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import keymirror from "keymirror";

import Fade from "@material-ui/core/Fade";

import {
  isLoggedIn as _isLoggedIn,
  getUser
} from "../../modules/session/selectors";
import paths from "../../pages/paths";

export const ROLES = Object.freeze(
  keymirror({
    PUBLIC: null,
    SUPERUSER: null,
    STAFF: null
  })
);

class Authenticated extends React.PureComponent {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    render: PropTypes.func.isRequired,
    location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
    history: PropTypes.shape({ push: PropTypes.func }).isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
    user: PropTypes.shape({
      groups: PropTypes.arrayOf(PropTypes.string),
      isSuperuser: PropTypes.bool,
      isStaff: PropTypes.bool
    }).isRequired
  };

  componentDidMount() {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      this.redirectToLogin();
    } else {
      this.checkUserRole();
      // @todo: check verified
    }
  }

  componentWillUnmount() {
    if (this.loadingTimeout) {
      clearTimeout(this.loadingTimeout);
    }
  }

  checkUserRole() {
    const { roles, user } = this.props;
    if (roles && Array.isArray(roles)) {
      if (roles.length === 0 || roles.includes(ROLES.PUBLIC)) {
        return;
      } else if (roles.includes(ROLES.SUPERUSER) && !user.isSuperuser) {
        this.redirectTo404();
      } else if (roles.includes(ROLES.STAFF)) {
        if (!user.isStaff) {
          this.redirectTo404();
          return;
        }

        // check groups
      }
    }
  }

  redirectTo404 = () => {
    const { history } = this.props;
    history.push(paths.ERROR_404);
  };

  redirectToLogin = () => {
    const { history, location } = this.props;
    history.push(`${paths.LOGIN}?redirect=${location.pathname}`);
  };

  render() {
    const { render } = this.props;
    return <Fade>{render()}</Fade>;
  }
}

function createContainer() {
  const mapStateToProps = state => ({
    isLoggedIn: _isLoggedIn(state),
    user: getUser(state)
  });

  const mapDispatchToProps = () => ({});

  return withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Authenticated)
  );
}
export function withAuth(Component, roles = []) {
  const Wrapper = createContainer();
  return props => (
    <Wrapper roles={roles} render={() => <Component {...props} />} />
  );
}

export default {
  withAuth
};

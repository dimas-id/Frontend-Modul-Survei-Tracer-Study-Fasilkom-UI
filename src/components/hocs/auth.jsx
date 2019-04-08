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
    mustVerified: PropTypes.bool,
    user: PropTypes.shape({
      groups: PropTypes.arrayOf(PropTypes.string),
      isSuperuser: PropTypes.bool,
      isStaff: PropTypes.bool,
      isVerified: PropTypes.bool
    }).isRequired
  };

  componentDidMount() {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      this.redirectToLogin();
    } else {
      this.checkUserRole();
      this.checkVerified();
    }
  }

  checkVerified() {
    const { user, mustVerified } = this.props;
    if (mustVerified && !user.isVerified) {
      this.redirectTo404();
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

export const authorize = options => Component => {
  const defaults = {
    mustVerified: false,
    role: [ROLES.PUBLIC],
    ...options
  };

  const Wrapper = createContainer();
  return props => (
    <Wrapper {...defaults} render={() => <Component {...props} />} />
  );
};

/**
 * @deprecated since version 1.0 (Iterasi 1)
 */
export const withAuth = (
  Component,
  options = { roles: [ROLES.PUBLIC], mustVerified: false }
) => {
  window.deprecationWarning(
    "withAuth is deprecated. Use authorize instead."
  );
  return authorize(options)(Component);
};

export default {
  withAuth,
  authorize
};

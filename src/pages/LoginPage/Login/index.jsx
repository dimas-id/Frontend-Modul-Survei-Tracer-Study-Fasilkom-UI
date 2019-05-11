import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import has from "lodash/has";
import { withStyles } from "@material-ui/core/styles";

import { login as _login } from "../../../modules/session/thunks";
import { layouts } from "../../../styles/guidelines";
import paths, { HOME } from "../../../pages/paths";
import { humanizeError, isStatusOK } from "../../../libs/response";

import LoginForm from "./LoginForm";
import { isLoggedIn } from "../../../modules/session/selectors";

const styles = theme => ({
  container: {
    ...layouts.flexDirCol,
    ...layouts.flexMiddle,
    ...layouts.w100,
  },
});

function getInitialValue() {
  return {
    email: "",
    password: "",
  };
}

class Login extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    login: PropTypes.func.isRequired,
    history: PropTypes.shape().isRequired,
    location: PropTypes.shape().isRequired,
  };

  componentDidMount() {
    const { loggedIn, history } = this.props;
    if (loggedIn) {
      history.replace(paths.HOME);
    }
  }

  getRedirectPath() {
    const { location } = this.props;
    if (location.search) {
      let { search } = location;
      search = search.split("=");
      if (search.length > 0) return search[1];
    }

    return paths.HOME;
  }

  redirectToNextPage = () => {
    const { history } = this.props;
    const url = this.getRedirectPath() || HOME;
    history.replace(url);
  };

  handleLogin = (values, actions) => {
    const { login } = this.props;
    actions.setErrors(getInitialValue());
    login(values.email, values.password)
      .catch(err => {
        if (err.response) {
          const fields = [LoginForm.field.email, LoginForm.field.password];
          const humanizedErr = humanizeError(err.response.data, fields);
          if (
            has(humanizedErr, LoginForm.field.email) &&
            has(humanizedErr, LoginForm.field.password)
          ) {
            actions.setErrors(humanizedErr);
          }
        }
        actions.setSubmitting(false);
        return err;
      })
      .then(resp => isStatusOK(resp) && this.redirectToNextPage());
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <LoginForm
          onSubmit={this.handleLogin}
          initialValues={getInitialValue()}
        />
      </div>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({
    loggedIn: isLoggedIn(state),
  });

  const mapDispatchToProps = dispatch => ({
    login: (email, password) => dispatch(_login(email, password)),
  });

  return withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(withStyles(styles)(Login))
  );
}

export default createContainer();

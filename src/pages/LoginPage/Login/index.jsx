import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import has from "lodash/has";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { login as _login } from "../../../modules/session/thunks";
import { layouts } from "../../../styles/guidelines";
import paths, { HOME } from "../../../pages/paths";
import { humanizeError, isStatusOK } from "../../../libs/response";

import LoginForm from "./LoginForm";

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
    password: ""
  };
}

class Login extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    login: PropTypes.func.isRequired,
    history: PropTypes.shape().isRequired,
    location: PropTypes.shape().isRequired
  };

  state = {
    errorMessage: null
  };

  setErrorMessage(errorMessage) {
    this.setState({ errorMessage });
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
    this.setErrorMessage("");
    actions.setErrors(getInitialValue());
    login(values.email, values.password)
      .catch(err => {
        const fields = [LoginForm.field.email, LoginForm.field.password];
        const humanizedErr = humanizeError(err.response.data, fields);
        if (
          has(humanizedErr, LoginForm.field.email) &&
          has(humanizedErr, LoginForm.field.password)
        ) {
          actions.setErrors(humanizedErr);
        } else {
          this.setErrorMessage(humanizedErr);
        }
        actions.setSubmitting(false);
        return err;
      })
      .then(resp => isStatusOK(resp) && this.redirectToNextPage());
  };

  render() {
    const { classes } = this.props;
    const { errorMessage } = this.state;
    return (
      <div className={classes.container}>
        {!!errorMessage && (
          <Typography gutterBottom align="center" color="error">
            {errorMessage}
          </Typography>
        )}
        <LoginForm
          onSubmit={this.handleLogin}
          initialValues={getInitialValue()}
        />
      </div>
    );
  }
}

function createContainer() {
  const mapStateToProps = () => ({});

  const mapDispatchToProps = dispatch => ({
    login: (email, password) => dispatch(_login(email, password))
  });

  return withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(withStyles(styles)(Login))
  );
}

export default createContainer();

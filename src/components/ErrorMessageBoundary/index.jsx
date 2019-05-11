import React from "react";
import {connect} from "react-redux";
import {push} from "connected-react-router";

import {isDevelopment} from "../../config";
import {getNonFieldError} from "../../libs/response";
import {utilityActions} from "../../modules/utility";
import {logout} from "../../modules/session/thunks";

/**
 * USE THIS IF ONLY YOU ARE NOT USING THUNK & MIDDLEWARE
 */
class Boundary extends React.PureComponent {
  static getDerivedStateFromError(error) {
    return {};
  }

  async componentDidCatch(e) {
    /**
     * check if offline
     */
    const {dispatch} = this.props;
    if (window.navigator && !window.navigator.onLine) {
      await dispatch(
        utilityActions.enqueueSnackbar(
          "Tidak terhubung dengan koneksi internet ☹",
          {variant: "warning"}
        )
      );
      return;
    }

    if (Boolean(e.response)) {
      const {data} = e.response;
      const errorMsg = getNonFieldError(data);
      if (errorMsg && typeof errorMsg === "string") {
        await dispatch(utilityActions.enqueueSnackbar(errorMsg, {variant: "error"}));
      }

      if (errorMsg === "Authentication credentials were not provided.") {
        // token is not set, redirect to login
        await dispatch(
          utilityActions.enqueueSnackbar("Anda perlu login terlebih dahulu", {
            variant: "warning",
          })
        );
        await dispatch(push("/login"));
      } else if (Boolean(data.code) && data.code === "token_not_valid") {
        // or token has expired, redirect to logout
        await dispatch(
          utilityActions.enqueueSnackbar("Anda perlu login terlebih dahulu", {
            variant: "warning",
          })
        );
        await dispatch(logout());
      }
    }

    if (isDevelopment) {
      throw e;
    }
  }

  render() {
    return this.props.children;
  }
}

export const ErrorMessageBoundary = connect()(Boundary);

export function withErrorMessageBoundary(Component) {
  return props => (
    <ErrorMessageBoundary>
      <Component {...props} />
    </ErrorMessageBoundary>
  );
}

export default ErrorMessageBoundary;

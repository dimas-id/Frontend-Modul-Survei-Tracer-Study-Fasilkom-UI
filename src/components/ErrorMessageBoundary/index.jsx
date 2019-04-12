import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { getNonFieldError } from "../../libs/response";
import { utilityActions } from "../../modules/utility";
import { logout } from "../../modules/session/thunks";

/**
 * USE THIS IF ONLY YOU ARE NOT USING THUNK & MIDDLEWARE
 */
class Boundary extends React.PureComponent {
  componentDidCatch(e) {
    /**
     * check if offline
     */
    const { dispatch } = this.props;
    if (window.navigator && !window.navigator.onLine) {
      dispatch(
        utilityActions.enqueueSnackbar(
          "Tidak terhubung dengan koneksi internet ☹",
          { variant: "warning" }
        )
      );
      return;
    }

    if (Boolean(e.response)) {
      const { data } = e.response;
      const errorMsg = getNonFieldError(data);
      if (errorMsg && typeof errorMsg === "string") {
        dispatch(
          utilityActions.enqueueSnackbar(errorMsg, { variant: "error" })
        );
      }

      if (errorMsg === "Authentication credentials were not provided.") {
        // token is not set, redirect to login
        dispatch(
          utilityActions.enqueueSnackbar("Anda perlu login terlebih dahulu", {
            variant: "warning"
          })
        );
        dispatch(push("/login"));
      } else if (Boolean(data.code) && data.code === "token_not_valid") {
        // or token has expired, redirect to logout
        dispatch(
          utilityActions.enqueueSnackbar("Anda perlu login terlebih dahulu", {
            variant: "warning"
          })
        );
        dispatch(logout());
      }
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

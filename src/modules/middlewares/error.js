import { replace } from "connected-react-router";
import { getNonFieldError, unauthorized } from "../../libs/response";
import { utilityActions } from "../utility";
import { logout } from "../session/thunks";

export default store => next => async action => {
  try {
    return await next(action);
  } catch (e) {
    /**
     * check if offline
     */
    if (window.navigator && !window.navigator.onLine) {
      store.dispatch(
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
        store.dispatch(
          utilityActions.enqueueSnackbar(errorMsg, { variant: "error" })
        );
      }

      if (errorMsg === "Authentication credentials were not provided.") {
        // token is not set, redirect to login
        store.dispatch(replace("/login"));
      } else if (
        (Boolean(data.code) && data.code === "token_not_valid") ||
        unauthorized(e.response)
      ) {
        // or token has expired, redirect to logout
        store.dispatch(logout());
      }
    }

    throw e;
  }
};

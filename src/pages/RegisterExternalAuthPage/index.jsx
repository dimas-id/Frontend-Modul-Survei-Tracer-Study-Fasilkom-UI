import React from "react";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import { loadUser } from "../../modules/session/thunks";
import { sessionAction } from "../../modules/session";
import { setAuthToken } from "../../libs/http";
import { makeQueryUri } from "../../libs/navigation";

import paths from "../paths";

function Desktop({ setToken, load, clearSession }) {
  const [state, setState] = React.useState({
    loading: true,
    nextPage: null
  });

  React.useEffect(() => {
    const checkUserCredential = async () => {
      const access = Cookies.getJSON("access");
      const refresh = Cookies.getJSON("refresh");
      const shouldComplete = Cookies.getJSON("should_complete_registration");
      const userId = Cookies.get("user_id");

      try {
        // process the token
        setAuthToken(access);
        await setToken(access, refresh);

        // load user first
        await load(userId);

        // decide
        const newState = { nextPage: paths.HOME };
        if (shouldComplete) {
          newState.nextPage = makeQueryUri(paths.USER_VERIFY, {
            redirect: paths.REGISTER_WORK_POSITION
          });
        }
        setState(newState);
      } catch (e) {
        setAuthToken(null);
        await clearSession();
      } finally {
        setState({ loading: false });
        Cookies.remove("access");
        Cookies.remove("refresh");
        Cookies.remove("should_complete_registration");
      }
    };
    checkUserCredential();
  }, []);

  return state.loading ? "loading..." : <Redirect to={state.nextPage} />;
}

export default connect(
  null,
  dispatch => ({
    load: userId => dispatch(loadUser(userId)),
    clearSession: () => dispatch(sessionAction.clearSession()),
    setToken: (access, refresh) =>
      dispatch(sessionAction.setToken(access, refresh))
  })
)(Desktop);

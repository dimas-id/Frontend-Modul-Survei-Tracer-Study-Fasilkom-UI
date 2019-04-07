import React from "react";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router";

import { loadUser } from "../../modules/session/thunks";
import { sessionAction } from "../../modules/session";
import { setAuthToken } from "../../libs/http";
import { makeQueryUri } from "../../libs/navigation";
import { LoadingScreen } from "../../components/Loading";

import paths from "../paths";
import { isLoggedIn } from "../../modules/session/selectors";

function Desktop({ setToken, load, clearSession, isLoggedIn, history }) {
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

    if (isLoggedIn) {
      history.replace(paths.HOME);
    } else {
      checkUserCredential();
    }
  }, []);

  return state.loading ? <LoadingScreen /> : <Redirect to={state.nextPage} />;
}

export default withRouter(
  connect(
    state => ({
      isLoggedIn: isLoggedIn(state)
    }),
    dispatch => ({
      load: userId => dispatch(loadUser(userId)),
      clearSession: () => dispatch(sessionAction.clearSession()),
      setToken: (access, refresh) =>
        dispatch(sessionAction.setToken(access, refresh))
    })
  )(Desktop)
);

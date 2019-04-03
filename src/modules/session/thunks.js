import pick from "lodash/pick";
import get from "lodash/get";
import { sessionAction } from "./index";
import { getUserRefreshToken } from "./selectors";
import { setAuthToken } from "../../libs/http";

export const loadUserById = userId => {
  return async (dispatch, _, { atlasAPIv1 }) => {
    try {
      const resp = await atlasAPIv1.session.getUserById(userId);
      await dispatch(sessionAction.setUser(resp.data));
      return resp;
    } catch (error) {
      throw error;
    }
  };
};

export const register = payload => {
  return async (dispatch, _, { atlasAPIv1 }) => {
    try {
      const response = await atlasAPIv1.session.register(payload);
      // set token to header
      setAuthToken(get(response, "data.access"));
      // save token & user  to redux
      await dispatch(
        sessionAction.setToken(pick(response.data, ["access", "refresh"]))
      );
      await dispatch(sessionAction.setUser(get(response, "data.user")));
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, _, { atlasAPIv1 }) => {
    try {
      const resp = await atlasAPIv1.session.login(email, password);
      // set token to header
      setAuthToken(get(resp, "data.access"));
      // save token & user  to redux
      await dispatch(
        sessionAction.setToken(pick(resp.data, ["access", "refresh"]))
      );
      await dispatch(sessionAction.setUser(get(resp, "data.user")));
      return resp;
    } catch (error) {
      throw error;
    }
  };
};

export const logout = () => {
  return async (dispatch, getState, { atlasAPIv1 }) => {
    try {
      await atlasAPIv1.session.refreshToken(getUserRefreshToken(getState())); // just change it
      await dispatch(sessionAction.clearSession());
      setAuthToken(undefined);
    } catch (error) {
      throw error;
    }
  };
};

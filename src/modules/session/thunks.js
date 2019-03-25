import pick from "lodash/pick";
import { sessionAction } from "./index";
import { setAuthToken } from "../api/http";

export const loadUserById = (userId) => {
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

export const checkUserSession = () => {
  return async (dispatch, __, { atlasAPIv1 }) => {
    try {
      return await atlasAPIv1.session.postToken();
    } catch (error) {
      await dispatch(sessionAction.clearToken());
      await dispatch(sessionAction.clearUser());
      throw error;
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, _, { atlasAPIv1 }) => {
    try {
      const resp = await atlasAPIv1.session.login(email, password);

      // set token to header
      setAuthToken(resp.data.access);
      // save token & user  to redux
      await dispatch(sessionAction.setToken(pick(resp, ["access", "refresh"])));
      await dispatch(sessionAction.setUser(resp.data.account));
      return resp;
    } catch (error) {
      throw error;
    }
  };
};

export const logout = () => {
  return async (dispatch, _, { atlasAPIv1 }) => {
    try {
      await atlasAPIv1.session.refreshToken(); // just change it
      await dispatch(sessionAction.clearSession());
      setAuthToken(undefined);
    } catch (error) {
      throw error;
    }
  };
};

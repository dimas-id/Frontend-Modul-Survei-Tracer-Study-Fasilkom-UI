import get from "lodash/get";
import pick from "lodash/pick";

import { sessionAction } from "./index";
import { getUserRefreshToken, getUserId } from "./selectors";
import { setAuthToken } from "../../libs/http";

export const loadUser = userId => {
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
        sessionAction.setToken(response.data.access, response.data.refresh)
      );
      await dispatch(sessionAction.setUser(get(response, "data.user")));
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const updateUserProfile = payload => {
  return async (dispatch, getState, { atlasAPIv1 }) => {
    const userProfile = pick(payload, [
      "residenceCity",
      "residenceCountry",
      "residenceLng",
      "residenceLat",
      "websiteUrl",
      "phoneNumber"
    ]);

    const userData = {
      profile: userProfile
    };

    try {
      const response = await atlasAPIv1.session.patchUserById(
        getUserId(getState()),
        userData
      );
      await dispatch(sessionAction.setUser(response.data));
      return response;
    } catch (error) {
      throw error;
    }
  };
};

export const verifyUser = (
  firstName,
  lastName,
  birthdate,
  latestCsuiClassYear,
  latestCsuiProgram,
  uiSsoNpm
) => {
  return async (dispatch, getState, { atlasAPIv1 }) => {
    try {
      const response = await atlasAPIv1.session.patchUserById(
        getUserId(getState()),
        {
          firstName,
          lastName,
          uiSsoNpm,
          profile: {
            birthdate,
            latestCsuiClassYear,
            latestCsuiProgram
          }
        }
      );
      await dispatch(sessionAction.setUser(response.data));
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
        sessionAction.setToken(resp.data.access, resp.data.refresh)
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
      setAuthToken(undefined);
      await atlasAPIv1.session.refreshToken(getUserRefreshToken(getState())); // just change it
      await dispatch(sessionAction.clearSession());
    } catch (error) {
      throw error;
    }
  };
};

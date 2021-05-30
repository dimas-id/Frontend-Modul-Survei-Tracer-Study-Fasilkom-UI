import get from "lodash/get";
import pick from "lodash/pick";
import omitBy from "lodash/omitBy";
import { push } from "connected-react-router";

import { sessionActions } from "./index";
import { getUserRefreshToken, getUserId } from "./selectors";
import { setAuthToken } from "../../libs/http";
import GoogleSheetsClient from "../sheets/sheetConfig"

export const loadUser = (userId, silent = false) => {
  return async (dispatch, _, { API: { atlasV1 } }) => {
    try {
      const resp = await atlasV1.session.getUserById(userId);
      await dispatch(sessionActions.setUser(resp.data));
      return resp;
    } catch (error) {
      if (!silent) {
        throw error;
      }
    }
  };
};

export const loadVotingResult = () => {
  console.log("bla bla")
  return async (dispatch, _) => {
    try {
      const client = new GoogleSheetsClient();
      console.log("masuk sokin broooo")
      let data = await client.get(0)
      await dispatch(sessionActions.setVotingResult(data))
      return data
    } catch(err) {
      console.log("Error: ", err)
    }
  }
}

export const register = payload => {
  return async (dispatch, _, { API: { atlasV2 }, utility }) => {
    try {
      const response = await atlasV2.session.register(
        omitBy(payload, value => !value)
      );
      // set token to header
      setAuthToken(get(response, "data.access"));
      // save token & user  to redux
      await dispatch(
        sessionActions.setToken(response.data.access, response.data.refresh)
      );
      await dispatch(sessionActions.setUser(get(response, "data.user")));
      await dispatch(
        utility.enqueueSnackbar(
          "Registrasi Sukses! Verifikasi sedang berjalan",
          { variant: "success" }
        )
      );
      return response;
    } catch (error) {
      await dispatch(
        utility.enqueueSnackbar("Gagal registrasi", { variant: "error" })
      );
      throw error;
    }
  };
};

export const updateUserProfile = payload => {
  return async (dispatch, getState, { API: { atlasV1 }, utility }) => {
    const userProfile = pick(payload, [
      "residenceCity",
      "residenceCountry",
      "residenceLng",
      "residenceLat",
      "linkedinUrl",
      "phoneNumber",
      "profilePicUrl",
    ]);

    const userData = {
      profile: userProfile,
    };

    try {
      const response = await atlasV1.session.patchUserById(
        getUserId(getState()),
        userData
      );
      await dispatch(sessionActions.setUser(response.data));
      await dispatch(
        utility.enqueueSnackbar("Profil berhasil disimpan", {
          variant: "success",
        })
      );
      return response;
    } catch (error) {
      await dispatch(
        utility.enqueueSnackbar("Gagal memperbarui profil", {
          variant: "error",
        })
      );
      throw error;
    }
  };
};

export const verifyUser = (firstName, lastName, birthdate) => {
  return async (dispatch, getState, { API: { atlasV1 }, utility }) => {
    try {
      const response = await atlasV1.session.patchUserById(
        getUserId(getState()),
        {
          firstName,
          lastName,
          profile: {
            birthdate,
          },
        }
      );
      await dispatch(sessionActions.setUser(response.data));
      await dispatch(
        utility.enqueueSnackbar("Mohon menunggu verifikasi sedang berjalan", {
          variant: "info",
        })
      );
      return response;
    } catch (error) {
      await dispatch(
        utility.enqueueSnackbar("Gagal memperbarui data verifikasi", {
          variant: "error",
        })
      );
      throw error;
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, _, { API: { atlasV1 }, utility }) => {
    try {
      const resp = await atlasV1.session.login(email, password);
      // set token to header
      setAuthToken(get(resp, "data.access"));
      // save token & user  to redux
      await dispatch(
        sessionActions.setToken(resp.data.access, resp.data.refresh)
      );
      await dispatch(sessionActions.setUser(get(resp, "data.user")));
      await dispatch(
        utility.enqueueSnackbar("Berhasil masuk", { variant: "success" })
      );
      return resp;
    } catch (error) {
      throw error;
    }
  };
};

export const logout = (force = false) => {
  return async (dispatch, getState, { API: { atlasV1 }, utility }) => {
    try {
      if (!force) {
        await atlasV1.session.refreshToken(getUserRefreshToken(getState())); // just change it
      }
    } finally {
      setAuthToken(undefined);
      await dispatch(push("/login"));
      await dispatch(sessionActions.clearSession());
      await dispatch(
        utility.enqueueSnackbar("Berhasil keluar", { variant: "success" })
      );
    }
  };
};

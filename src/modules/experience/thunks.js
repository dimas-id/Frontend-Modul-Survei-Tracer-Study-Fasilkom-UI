import { experienceActions } from "./index";
import { getUserId } from "../session/selectors";

export const loadPositions = userId => {
  return async (dispatch, _, { API: { atlasV1 } }) => {
    try {
      // assuming that user wont have > 100 work position in their lifetime
      const resp = await atlasV1.experience.getPositions(userId, 0, 100);
      await dispatch(experienceActions.setWorkPositions(resp.data));
      return resp;
    } catch (error) {
      throw error;
    }
  };
};

export const createPositions = positionData => {
  return async (dispatch, getState, { API: { atlasV1 }, utility }) => {
    try {
      const userId = getUserId(getState());
      const resp = await atlasV1.experience.createPosition(
        userId,
        positionData
      );
      await dispatch(loadPositions(userId));
      await dispatch(
        utility.enqueueSnackbar(
          "Berhasil membuat riwayat posisi pekerjaan baru",
          { variant: "success" }
        )
      );
      return resp;
    } catch (error) {
      throw error;
    }
  };
};

export const updateWorkPositionById = (positionId, positionData) => {
  return async (dispatch, getState, { API: { atlasV1 }, utility }) => {
    try {
      const userId = getUserId(getState());
      const resp = await atlasV1.experience.updatePosition(
        userId,
        positionId,
        positionData
      );
      await dispatch(loadPositions(userId));
      await dispatch(
        utility.enqueueSnackbar(
          "Berhasil memperbarui riwayat posisi pekerjaan",
          { variant: "success" }
        )
      );
      return resp;
    } catch (error) {
      throw error;
    }
  };
};

export const deleteWorkPositionById = positionId => {
  return async (dispatch, getState, { API: { atlasV1 }, utility }) => {
    try {
      const userId = getUserId(getState());
      const resp = await atlasV1.experience.deletePosition(userId, positionId);
      await dispatch(loadPositions(userId));
      await dispatch(
        utility.enqueueSnackbar("Berhasil menghapus riwayat posisi pekerjaan", {
          variant: "success"
        })
      );
      return resp;
    } catch (error) {
      throw error;
    }
  };
};

export const loadEducations = userId => {
  return async (dispatch, _, { API: { atlasV1 } }) => {
    try {
      // assuming that user wont have > 100 work position in their lifetime
      const resp = await atlasV1.experience.getEducations(userId, 0, 100);
      await dispatch(experienceActions.setEducations(resp.data));
      return resp;
    } catch (error) {
      throw error;
    }
  };
};

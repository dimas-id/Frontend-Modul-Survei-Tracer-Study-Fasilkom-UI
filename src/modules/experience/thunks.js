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
      await dispatch(
        utility.enqueueSnackbar(
          "Gagal membuat riwayat posisi pekerjaan baru",
          { variant: "error" }
        )
      );
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
      await dispatch(
        utility.enqueueSnackbar(
          "Gagal memperbarui riwayat posisi pekerjaan baru",
          { variant: "error" }
        )
      );
      throw error;
    }
  };
};

export const deleteWorkPositionById = positionId => {
  return async (dispatch, getState, { API: { atlasV1 }, utility }) => {
    try {
      const userId = getUserId(getState());
      const resp = await atlasV1.experience.deletePosition(userId, positionId);
      await dispatch(
        utility.enqueueSnackbar("Berhasil menghapus riwayat posisi pekerjaan", {
          variant: "success",
        })
      );
      await dispatch(loadPositions(userId));
      return resp;
    } catch (error) {
      await dispatch(
        utility.enqueueSnackbar(
          "Gagal menghapus riwayat posisi pekerjaan baru",
          { variant: "error" }
        )
      );
      throw error;
    }
  };
};

export const loadEducations = userId => {
  return async (dispatch, _, { API: { atlasV1 } }) => {
    try {
      // assuming that user wont have > 3 educations in Fasilkom UI (S1, S2, S3)
      const resp = await atlasV1.experience.getEducations(userId, 0, 3);
      await dispatch(experienceActions.setEducations(resp.data));
      return resp;
    } catch (error) {
      throw error;
    }
  };
};

export const createEducations = educations => {
  return async (dispatch, getState, { API: { atlasV1 }, utility }) => {
    try {
      const userId = getUserId(getState());
      const resp = await atlasV1.experience.createEducations(
        userId,
        educations
      );
      await dispatch(
        utility.enqueueSnackbar(
          "Berhasil menambah riwayat pendidikan di Fasilkom UI",
          { variant: "success" }
        )
      );
      await dispatch(loadEducations(userId));
      return resp;
    } catch (error) {
      throw error;
    }
  };
};

export const loadOtherEdus = userId => {
  return async (dispatch, _, { API: { atlasV1 } }) => {
    try {
      // assuming that user wont have > 3 other educations
      const resp = await atlasV1.experience.getOtherEdus(userId, 0, 3);
      await dispatch(experienceActions.setOtherEdus(resp.data));
      return resp;
    } catch (error) {
      throw error;
    }
  };
};

export const createOtherEdus = otherEduData => {
  return async (dispatch, getState, { API: { atlasV1 }, utility }) => {
    try {
      const userId = getUserId(getState());
      const resp = await atlasV1.experience.createOtherEdu(
        userId,
        otherEduData
      );
      await dispatch(loadOtherEdus(userId));
      await dispatch(
        utility.enqueueSnackbar(
          "Berhasil membuat riwayat pendidikan baru",
          { variant: "success" }
        )
      );
      return resp;
    } catch (error) {
      await dispatch(
        utility.enqueueSnackbar("Gagal membuat riwayat pendidikan baru", {
          variant: "error",
        })
      );
      throw error;
    }
  };
};

export const updateOtherEduById = (otherEduId, otherEduData) => {
  return async (dispatch, getState, { API: { atlasV1 }, utility }) => {
    try {
      const userId = getUserId(getState());
      const resp = await atlasV1.experience.updateOtherEdu(
        userId,
        otherEduId,
        otherEduData
      );
      await dispatch(loadOtherEdus(userId));
      await dispatch(
        utility.enqueueSnackbar(
          "Berhasil memperbarui riwayat pendidikan",
          { variant: "success" }
        )
      );
      return resp;
    } catch (error) {
      await dispatch(
        utility.enqueueSnackbar(
          "Gagal memperbarui riwayat pendidikan",
          { variant: "error" }
        )
      );
      throw error;
    }
  };
};

export const deleteOtherEduById = otherEduId => {
  return async (dispatch, getState, { API: { atlasV1 }, utility }) => {
    try {
      const userId = getUserId(getState());
      const resp = await atlasV1.experience.deleteOtherEdu(userId, otherEduId);
      await dispatch(
        utility.enqueueSnackbar("Berhasil menghapus riwayat pendidikan", {
          variant: "success",
        })
      );
      await dispatch(loadOtherEdus(userId));
      return resp;
    } catch (error) {
      await dispatch(
        utility.enqueueSnackbar(
          "Gagal menghapus riwayat pendidikan",
          { variant: "error" }
        )
      );
      throw error;
    }
  };
};

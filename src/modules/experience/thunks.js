import { experienceActions } from "./index";
import { getUserId } from "../session/selectors";

export const loadPositions = userId => {
  return async (dispatch, _, { atlasAPIv1 }) => {
    try {
      // assuming that user wont have > 100 work position in their lifetime
      const resp = await atlasAPIv1.experience.getPositions(userId, 0, 100);
      await dispatch(experienceActions.setWorkPositions(resp.data));
      return resp;
    } catch (error) {
      throw error;
    }
  };
};

export const createPositions = positionData => {
  return async (dispatch, getState, { atlasAPIv1 }) => {
    try {
      const userId = getUserId(getState());
      const resp = await atlasAPIv1.experience.createPosition(
        userId,
        positionData
      );
      await dispatch(loadPositions(userId));
      return resp;
    } catch (error) {
      throw error;
    }
  };
};

export const updateWorkPositionById = (positionId, positionData) => {
  return async (dispatch, getState, { atlasAPIv1 }) => {
    try {
      const userId = getUserId(getState());
      const resp = await atlasAPIv1.experience.updatePosition(
        userId,
        positionId,
        positionData
      );
      await dispatch(loadPositions(userId));
      return resp;
    } catch (error) {
      throw error;
    }
  };
};

export const loadEducations = userId => {
  return async (dispatch, _, { atlasAPIv1 }) => {
    try {
      // assuming that user wont have > 100 work position in their lifetime
      const resp = await atlasAPIv1.experience.getEducations(userId, 0, 100);
      await dispatch(experienceActions.setEducations(resp.data));
      return resp;
    } catch (error) {
      throw error;
    }
  };
};
/**
 * Reducer for experience
 */
const SET_WORK_POSITIONS = "experience/SET_WORK_POSITIONS";
const SET_EDUCATIONS = "experience/SET_EDUCATIONS";
const SET_OTHER_EDUCATIONS = "experience/SET_OTHER_EDUCATIONS";

const INITIAL_STATE = {
  workPositions: undefined,
  educations: undefined,
  otherEdus: undefined,
};

export function experienceReducer(state, action) {
  switch (action.type) {
    case SET_WORK_POSITIONS:
      return {
        ...state,
        workPositions: action.payload,
      };
    case SET_EDUCATIONS:
      return {
        ...state,
        educations: action.payload,
      };
    case SET_OTHER_EDUCATIONS:
      return {
        ...state,
        otherEdus: action.payload,
      };
    default:
      return state || INITIAL_STATE;
  }
}

export const experienceActions = Object.freeze({
  setWorkPositions: workPositions => ({
    type: SET_WORK_POSITIONS,
    payload: workPositions,
  }),
  setEducations: educations => ({
    type: SET_EDUCATIONS,
    payload: educations,
  }),
  setOtherEdus: otherEdus => ({
    type: SET_OTHER_EDUCATIONS,
    payload: otherEdus,
  }),
});

export default {
  experienceActions,
  experienceReducer,
};

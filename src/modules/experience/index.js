/**
 * Reducer for experience
 */
const SET_WORK_POSITIONS = "experience/SET_WORK_POSITIONS";
const SET_EDUCATIONS = "experience/SET_EDUCATIONS";

const INITIAL_STATE = {
  workPositions: undefined,
  educations: undefined
};

export function experienceReducer(state, action) {
  switch (action.type) {
    case SET_WORK_POSITIONS:
      return {
        ...state,
        workPositions: action.payload
      };
    case SET_EDUCATIONS:
      return {
        ...state,
        workPositions: action.payload
      };
    default:
      return state || INITIAL_STATE;
  }
}

export const experienceActions = Object.freeze({
  setWorkPositions: workPositions => ({
    type: SET_WORK_POSITIONS,
    payload: workPositions
  }),
  setEducations: educations => ({
    type: SET_EDUCATIONS,
    payload: educations
  })
});

export default {
  experienceActions,
  experienceReducer
}
/**
 * Reducer for experience authentication
 */
const SET_WORK_POSITIONS = "experience/SET_WORK_POSITIONS";

const INITIAL_STATE = {
  workPositions: undefined,
};

export default function experienceReducer(state, action) {
  switch (action.type) {
    case SET_WORK_POSITIONS:
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
});

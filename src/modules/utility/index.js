/**
 * Reducer for utility
 */
const SHOW_ALERT = "utility/SHOW_ALERT";
const HIDE_ALERT = "utility/HIDE_ALERT";

const INITIAL_STATE = {
  showAlert: false,
  alert: null
};

export default function utilityReducer(state, action) {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        showAlert: true,
        alert: action.payload
      };
    case HIDE_ALERT:
      return {
        ...state,
        showAlert: false,
        alert: null
      };

    default:
      return state || INITIAL_STATE;
  }
}

export const utilityActions = Object.freeze({
  showAlert: alert => ({
    type: SHOW_ALERT,
    payload: alert
  }),
  hideAlert: () => ({
    type: HIDE_ALERT
  })
});

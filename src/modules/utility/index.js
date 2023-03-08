/**
 * Reducer for utility
 */
const SHOW_ALERT = "utility/SHOW_ALERT";
const HIDE_ALERT = "utility/HIDE_ALERT";
const ENQUEUE_SNACKBAR = "utility/ENQUEUE_SNACKBAR";
const REMOVE_SNACKBAR = "utility/REMOVE_SNACKBAR"; // because any item in queue can be removed before they on the left

const INITIAL_STATE = {
  showAlert: false,
  alert: null,
  notifications: [],
};

export function utilityReducer(state, action) {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        showAlert: true,
        alert: action.payload,
      };
    case HIDE_ALERT:
      return {
        ...state,
        showAlert: false,
        alert: null,
      };
    case ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.notification,
          },
        ],
      };
    case REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.key !== action.key
        ),
      };
    default:
      return state || INITIAL_STATE;
  }
}

export const utilityActions = Object.freeze({
  showAlert: (title, message, onPositive, onNegative) => ({
    type: SHOW_ALERT,
    payload: { title, message, onPositive, onNegative },
  }),
  hideAlert: () => ({
    type: HIDE_ALERT,
  }),
  enqueueSnackbar: (message, options) => {
    /**
     * // text of the snackbar
     * message                 type:string         required: true
     *
     *  // object containing options with the following shape
     *  options:                type:object         required: false
     *
     * // type of the snackbar
     * options.variant         type:string         oneOf(['default', 'error', 'success', 'warning', 'info'])
     *
     * // keep a snackbar in the view and prevent auto dismissal
     * options.persist         type:boolean        required: false
     *
     * // hide or display this message if it's the same of the previous one
     * options.preventDuplicate type:boolean        required: false
     *
     * // You can pass any material-ui Snackbar prop here, and they will be applied to this
     * // individual snackbar. For example, this particular snackbar will get dismissed after 1 second.
     * options.autoHideDuration: 1000
     */
    return {
      type: ENQUEUE_SNACKBAR,
      notification: {
        key: new Date().getTime() + Math.random(),
        message,
        options,
      },
    };
  },
  removeSnackbar: key => ({
    type: REMOVE_SNACKBAR,
    key,
  }),
});

export function createGlobalDialog(store) {
  window.alertDialog = function(title, message, onPositive, onNegative) {
    store.dispatch(
      utilityActions.showAlert(title, message, onPositive, onNegative)
    );
  };
}

export function createGlobalSnackbar(store) {
  window.notifySnackbar = function(message, options) {
    store.dispatch(utilityActions.enqueueSnackbar(message, options));
  };
}

const utility = {
  utilityActions,
  utilityReducer,
  createGlobalDialog,
  createGlobalSnackbar,
};

export default utility;

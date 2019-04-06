/**
 * Reducer for session authentication
 */
const SET_TOKEN = "session/SET_TOKEN";
const CLEAR_TOKEN = "session/CLEAR_TOKEN";
const SET_USER = "session/SET_USER";
const CLEAR_USER = "session/CLEAR_USER";
const CLEAR_SESSION = "session/CLEAR_SESSION";

const INITIAL_STATE = {
  token: undefined,
  user: undefined
};

export default function sessionReducer(state, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case CLEAR_TOKEN:
      return {
        ...state,
        token: null
      };
    case SET_USER:
      return {
        ...state,
        user: { ...action.payload }
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null
      };
    case CLEAR_SESSION:
      return {
        token: null,
        user: null
      };
    default:
      return state || INITIAL_STATE;
  }
}

export const sessionAction = Object.freeze({
  setToken: (access, refresh) => ({
    type: SET_TOKEN,
    payload: { access, refresh }
  }),

  clearToken: () => ({
    type: CLEAR_TOKEN
  }),

  setUser: user => ({
    type: SET_USER,
    payload: user
  }),

  clearUser: () => ({
    type: CLEAR_USER
  }),

  clearSession: () => ({
    type: CLEAR_SESSION
  })
});

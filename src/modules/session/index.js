import keymirror from "keymirror";

export const ROLES = Object.freeze(
  keymirror({
    PUBLIC: null,
    SUPERUSER: null,
    STAFF: null,
  }),
);

export const GROUPS = Object.freeze({
  ADMIN_USER: 'admin_user',
  ADMIN_DONATION: 'admin_donation',
  ADMIN_CHANNEL: 'admin_channel',
  MANAGEMENT: 'management'
})

/**
 * Reducer for session authentication
 */
const SET_TOKEN = "session/SET_TOKEN";
const CLEAR_TOKEN = "session/CLEAR_TOKEN";
const SET_USER = "session/SET_USER";
const CLEAR_USER = "session/CLEAR_USER";
const CLEAR_SESSION = "session/CLEAR_SESSION";
const SET_VOTING_RESULT = "sheets/SET_VOTING_RESULT"

const INITIAL_STATE = {
  token: undefined,
  user: undefined,
  votingResult: undefined
};

export function sessionReducer(state, action) {
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
    case SET_VOTING_RESULT:
      return {
        ...state,
        votingResult: action.payload
      }
    default:
      return state || INITIAL_STATE;
  }
}

export const sessionActions = Object.freeze({
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
  }),

  setVotingResult: votingResult => ({
    type: SET_VOTING_RESULT,
    payload: votingResult
  })
});

export default {
  sessionReducer,
  sessionActions
};

/**
 * Reducer for utility
 */
import {mailerReducer} from "./mailer";

const SET_CONTACTS = "crm/SET_CONTACTS";
const CLEAR_CONTACTS = "crm/CLEAR_CONTACTS";

const INITIAL_STATE = {
  contacts: [],
  mailer: null,
};

export function crmReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CONTACTS:
      return {...state, contacts: action.payload};
    case CLEAR_CONTACTS:
      return {...state, contacts: []};
    default:
      return {...state, mailer: mailerReducer(state.mailer, action)};
  }
}

export const crmAction = Object.freeze({
  setContacts: contacts => ({
    type: SET_CONTACTS,
    payload: contacts,
  }),
  clearContacts: () => ({
    type: CLEAR_CONTACTS,
  }),
});

export default {
  crmAction,
  crmReducer,
};

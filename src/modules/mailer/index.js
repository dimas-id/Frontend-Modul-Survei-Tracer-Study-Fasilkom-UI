/**
 * Reducer for utility
 */
const SET_TEMPLATE_TAGS = "email/SET_TEMPLATE_TAGS";
const CLEAR_TEMPLATE_TAGS = "email/CLEAR_TEMPLATE_TAGS";

const INITIAL_STATE = {
  tags: {},
};

export function mailerReducer(state, action) {
  switch (action.type) {
    case SET_TEMPLATE_TAGS:
      return {
        ...state,
        tags: action.payload,
      };

    case CLEAR_TEMPLATE_TAGS:
      return {
        ...state,
        tags: {},
      };
    default:
      return state || INITIAL_STATE;
  }
}

export const mailerAction = Object.freeze({
  setTemplateTags: tags => ({
    type: SET_TEMPLATE_TAGS,
    payload: tags,
  }),
  clearTemplateTags: () => ({
    type: CLEAR_TEMPLATE_TAGS,
  }),
});

export default {
  mailerAction,
  mailerReducer,
};

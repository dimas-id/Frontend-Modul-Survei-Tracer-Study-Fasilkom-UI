/**
 * Reducer for utility
 */
const SET_TEMPLATE_TAGS = "email/SET_TEMPLATE_TAGS";
const CLEAR_TEMPLATE_TAGS = "email/CLEAR_TEMPLATE_TAGS";
const SET_TEMPLATES = "email/SET_TEMPLATES";
const CLEAR_TEMPLATES = "email/CLEAR_TEMPLATES";
const SET_BATCH = "email/SET_BATCH";
const CLEAR_BATCH = "email/CLEAR_BATCH";

const INITIAL_STATE = {
  tags: {},
  templates: [],
  batch: {},
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
    case SET_TEMPLATES:
      return {
        ...state,
        templates: action.payload,
      };
    case CLEAR_TEMPLATES:
      return {
        ...state,
        templates: [],
      };
    case SET_BATCH:
      return {
        ...state,
        batch: action.payload,
      };
    case CLEAR_BATCH:
      return {
        ...state,
        batch: {},
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
  setTemplates: templates => ({
    type: SET_TEMPLATES,
    payload: templates,
  }),
  clearTemplates: () => ({
    type: CLEAR_TEMPLATES,
  }),
  setBatch: batch => ({
    type: SET_BATCH,
    payload: batch,
  }),
  clearBatch: () => ({
    type: CLEAR_BATCH,
  }),
});

export default {
  mailerAction,
  mailerReducer,
};

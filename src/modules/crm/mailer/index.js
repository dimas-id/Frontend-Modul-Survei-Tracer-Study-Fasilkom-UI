/**
 * Reducer for utility
 */
const SET_TEMPLATE_TAGS = "crm/mailer/SET_TEMPLATE_TAGS";
const CLEAR_TEMPLATE_TAGS = "crm/mailer/CLEAR_TEMPLATE_TAGS";
const SET_TEMPLATES = "crm/mailer/SET_TEMPLATES";
const CLEAR_TEMPLATES = "crm/mailer/CLEAR_TEMPLATES";
const SET_BATCH = "crm/mailer/SET_BATCH";
const CLEAR_BATCH = "crm/mailer/CLEAR_BATCH";

const SET_BATCHES = "crm/mailer/SET_BATCHES";
const CLEAR_BATCHES = "crm/mailer/CLEAR_BATCHES";
const SET_JOBS = "crm/mailer/SET_JOBS";
const CLEAR_JOBS = "crm/mailer/CLEAR_JOBS";

const INITIAL_STATE = {
  tags: {},
  templates: [],
  batch: {},
  batches: [],
  jobs: [],
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

    case SET_BATCHES:
      return {
        ...state,
        batches: action.payload,
      };
    case CLEAR_BATCHES:
      return {
        ...state,
        batches: [],
      };

    case SET_JOBS:
      return {
        ...state,
        jobs: action.payload,
      };
    case CLEAR_JOBS:
      return {
        ...state,
        jobs: [],
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
  setBatches: batch => ({
    type: SET_BATCHES,
    payload: batch,
  }),
  clearBatches: () => ({
    type: CLEAR_BATCHES,
  }),
  setJobs: batch => ({
    type: SET_JOBS,
    payload: batch,
  }),
  clearJobs: () => ({
    type: CLEAR_JOBS,
  }),
});

export default {
  mailerAction,
  mailerReducer,
};

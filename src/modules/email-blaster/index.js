/**
 * Reducer for Email Blaster Multi Step Form
 */
const CHANGE_TEMPLATE_ID = "email-blaster/CHANGE_TEMPLATE_ID";
const CHANGE_SURVEI_ID = "email-blaster/CHANGE_SURVEI_ID";
const CHANGE_RECIPIENTS = "email-blaster/CHANGE_RECIPIENTS";

const INITIAL_STATE = {
  templateId: null,
  surveiId: 10,
  recipients: ["joshstevenlasimann@gmail.com"],
};

export function emailBlasterReducer(state, action) {
  switch (action.type) {
    case CHANGE_TEMPLATE_ID:
      return {
        ...state,
        templateId: action.payload,
      };
    case CHANGE_SURVEI_ID:
      return {
        ...state,
        surveiId: action.payload,
      };
    case CHANGE_RECIPIENTS:
      return {
        ...state,
        recipients: action.payload,
      };
    default:
      return state || INITIAL_STATE;
  }
}

export const emailBlasterActions = Object.freeze({
  changeTemplateId: templateId => ({
    type: CHANGE_TEMPLATE_ID,
    payload: templateId,
  }),
  changeSurveiId: surveiId => ({
    type: CHANGE_SURVEI_ID,
    payload: surveiId,
  }),
  changeRecipients: recipients => ({
    type: CHANGE_RECIPIENTS,
    payload: recipients,
  }),
});

export default emailBlasterReducer;

import {mailerAction} from "./index";

export function getTemplateTags() {
  return async (dispatch, _, {API: {heliosV1}}) => {
    try {
      const resp = await heliosV1.email.getTemplateTags();
      await dispatch(mailerAction.setTemplateTags(resp.data));
      return resp;
    } catch (error) {
      throw error;
    }
  };
}

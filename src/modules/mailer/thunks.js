import get from "lodash/get";
import pick from "lodash/pick";
import {replace} from "connected-react-router";
import {notFound} from "../../libs/response";
import {mailerAction} from "./index";
import paths from "../../pages/paths";

export function getTemplateTags() {
  return async (dispatch, _, {API: {heliosV1}}) => {
    const resp = await heliosV1.email.getTemplateTags();
    await dispatch(mailerAction.setTemplateTags(resp.data));
    return resp;
  };
}

export function getTemplates(offset, limit) {
  return async (dispatch, _, {API: {heliosV1}}) => {
    const resp = await heliosV1.email.getEmailTemplateList();
    await dispatch(mailerAction.setTemplates(get(resp, "data.results")));
    return resp;
  };
}

export function createBatch(title, subject, template, senderAddress) {
  return async (dispatch, __, {utility, API: {heliosV1}}) => {
    try {
      const resp = await heliosV1.email.postBatch(
        title,
        subject,
        template,
        senderAddress
      );
      await dispatch(
        utility.enqueueSnackbar(`Batch ${title} berhasil dibuat.`, {
          variant: "success",
        })
      );
      return resp;
    } catch (e) {
      if (e.response) {
        await dispatch(
          utility.enqueueSnackbar(`Batch ${title} gagal dibuat.`, {
            variant: "error",
          })
        );
      }
      throw e;
    }
  };
}

export function getBatchById(batchId) {
  return async (dispatch, _, {utility, API: {heliosV1}}) => {
    try {
      const resp = await heliosV1.email.getBatchById(batchId);
      await dispatch(mailerAction.setBatch(resp.data));
      return resp;
    } catch (e) {
      if (e.response && notFound(e.response)) {
        await dispatch(replace(paths.ERROR_404));
        return;
      }
      throw e;
    }
  };
}

export function updateBatch(batchId, payload) {
  return async (dispatch, _, {utility, API: {heliosV1}}) => {
    try {
      const resp = await heliosV1.email.updateBatch(
        batchId,
        pick(payload, ["title", "subject", "template", "senderAddress"])
      );
      await dispatch(mailerAction.setBatch(resp.data));
      return resp;
    } catch (e) {
      if (e.response && notFound(e.response)) {
        replace(paths.ERROR_404);
        return;
      }
      throw e;
    }
  };
}

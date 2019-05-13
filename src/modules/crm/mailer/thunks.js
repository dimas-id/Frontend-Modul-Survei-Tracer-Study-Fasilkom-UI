import get from "lodash/get";
import pick from "lodash/pick";
import isEmpty from "lodash/isEmpty";
import { replace } from "connected-react-router";
import { notFound } from "../../../libs/response";
import { mailerAction } from "./index";
import paths from "../../../pages/paths";
import {selectJobs} from "./selectors";

export function getTemplateTags() {
  return async (dispatch, _, { API: { heliosV1 } }) => {
    const resp = await heliosV1.email.getTemplateTags();
    await dispatch(mailerAction.setTemplateTags(resp.data));
    return resp;
  };
}

export function getTemplates(offset, limit) {
  return async (dispatch, _, { API: { heliosV1 } }) => {
    const resp = await heliosV1.email.getEmailTemplateList();
    await dispatch(mailerAction.setTemplates(get(resp, "data.results")));
    return resp;
  };
}

export function createJobs(batchId, jobs) {
  return async (dispatch, _, { utility, API: { heliosV1 } }) => {
    try {
      const resp = await heliosV1.email.postJobs(batchId, jobs);
      await dispatch(
        utility.enqueueSnackbar(
          `${resp.data.length} jobs untuk ${
            jobs.length
          } kontak berhasil dibuat.`,
          {
            variant: "success",
          }
        )
      );
      return resp;
    } catch (e) {
      if (e.response) {
        await dispatch(
          utility.enqueueSnackbar(
            `Jobs gagal dibuat. Simpan ulang untuk menambahkan kontak.`,
            {
              variant: "error",
            }
          )
        );
      }
      throw e;
    }
  };
}

export function createBatch(title, subject, template, senderAddress) {
  return async (dispatch, __, { utility, API: { heliosV1 } }) => {
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
  return async (dispatch, _, { utility, API: { heliosV1 } }) => {
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
  return async (dispatch, _, { utility, API: { heliosV1 } }) => {
    try {
      const resp = await heliosV1.email.updateBatch(
        batchId,
        pick(payload, ["title", "subject", "template", "senderAddress"])
      );
      await dispatch(mailerAction.setBatch(resp.data));
      await dispatch(
        utility.enqueueSnackbar(`Batch ${batchId} berhasil diubah.`, {
          variant: "success",
        })
      );
      return resp;
    } catch (e) {
      if (e.response) {
        if (notFound(e.response)) {
          replace(paths.ERROR_404);
        } else {
          await dispatch(
            utility.enqueueSnackbar(`Batch ${batchId} gagal diubah.`, {
              variant: "error",
            })
          );
        }
        return;
      }
      throw e;
    }
  };
}

export function deleteBatchById(batchId) {
  return async (dispatch, getState, { utility, API: { heliosV1 } }) => {
    try {
      const resp = await heliosV1.email.deleteBatch(batchId);
      await dispatch(
        utility.enqueueSnackbar(`Batch ${batchId} berhasil dihapus.`, {
          variant: "success",
        })
      );

      // clear the jobs if it comes from same batch, usually it does
      const jobs = selectJobs(getState());
      if(!isEmpty(jobs) && jobs[0].batch === batchId) {
        await dispatch(mailerAction.clearJobs());
      }

      await dispatch(getBatches());
      return resp;
    } catch (e) {
      if (e.response) {
        await dispatch(
          utility.enqueueSnackbar(`Batch ${batchId} gagal dihapus.`, {
            variant: "error",
          })
        );
        return;
      }
      throw e;
    }
  };
}

export function sendBatch(batchId) {
  return async (dispatch, _, { utility, API: { heliosV1 } }) => {
    try {
      const resp = await heliosV1.email.sendBatch(batchId);
      await dispatch(
        utility.enqueueSnackbar(`${get(resp, 'data.queued')} job sedang diproses untuk dikirim.`, {
          variant: "info",
        })
      );
      dispatch(getBatchById(batchId));
      dispatch(getJobs(batchId));
      return resp;
    } catch (e) {
      if (e.response) {
        await dispatch(
          utility.enqueueSnackbar(`Batch ${batchId} gagal diproses untuk dikirim.`, {
            variant: "error",
          })
        );
        dispatch(getJobs(batchId));
        return;
      }
      throw e;
    }
  };
}

export function getBatches() {
  return async (dispatch, _, { utility, API: { heliosV1 } }) => {
    const resp = await heliosV1.email.getBatches();
    await dispatch(mailerAction.setBatches(resp.data.results));
    return resp;
  };
}

export function getJobs(batchId) {
  return async (dispatch, _, { utility, API: { heliosV1 } }) => {
    const resp = await heliosV1.email.getJobs(batchId);
    await dispatch(mailerAction.setJobs(resp.data.results));
    return resp;
  };
}


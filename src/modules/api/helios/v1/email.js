import http from "../../../../libs/http";
import { API_V1_URL } from "../config";
import { makeQueryUri } from "../../../../libs/navigation";

export default Object.freeze({
  getEmailTemplateList: (limit = 5000, offset = 0) =>
    http.get(makeQueryUri(`${API_V1_URL}/email-templates`, { limit, offset })),
  getEmailTemplateById: emailTemplateId =>
    http.get(`${API_V1_URL}/email-templates/${emailTemplateId}`),
  updateEmailTemplate: (emailTemplateId, title, body, description, subject) =>
    http.patch(`${API_V1_URL}/email-templates/${emailTemplateId}`, {
      title,
      body,
      description,
      subject,
    }),
  createEmailTemplate: (title, body, description, subject) =>
    http.post(`${API_V1_URL}/email-templates`, {
      title,
      body,
      description,
      subject,
    }),
  deleteEmailTemplate: emailTemplateId =>
    http.delete(`${API_V1_URL}/email-templates/${emailTemplateId}`),
  getTemplateTags: () => http.get(`${API_V1_URL}/email-templates/tags`),

  // batch
  getBatches: (limit = 500, offset = 0) =>
    http.get(makeQueryUri(`${API_V1_URL}/batches`, { limit, offset })),
  getBatchById: batchId => http.get(`${API_V1_URL}/batches/${batchId}`),
  postBatch: (title, subject, template, senderAddress) =>
    http.post(`${API_V1_URL}/batches`, {
      title,
      subject,
      template,
      senderAddress,
    }),
  updateBatch: (batchId, payload) =>
    http.patch(`${API_V1_URL}/batches/${batchId}`, payload),
  deleteBatch: (batchId, payload) =>
    http.delete(`${API_V1_URL}/batches/${batchId}`),
  sendBatch: batchId => http.post(`${API_V1_URL}/batches/${batchId}/send`),

  getJobs: (batchId, limit = 500, offset = 0) =>
    http.get(
      makeQueryUri(`${API_V1_URL}/batches/${batchId}/jobs`, { limit, offset })
    ),
  postJobs: (batchId, jobs) =>
    http.post(`${API_V1_URL}/batches/${batchId}/jobs`, jobs),
});

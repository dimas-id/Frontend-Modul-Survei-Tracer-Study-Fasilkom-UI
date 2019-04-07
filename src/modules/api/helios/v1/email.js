import http from "../../../../libs/http";
import { API_V1_URL } from "../config";

export default Object.freeze({
  getEmailTemplateList: () => http.get(`${API_V1_URL}/email-templates`),
  getEmailTemplateById: emailTemplateId =>
    http.get(`${API_V1_URL}/email-templates/${emailTemplateId}`),
  updateEmailTemplate: (emailTemplateId, title, body, description, subject) =>
    http.patch(`${API_V1_URL}/email-templates/${emailTemplateId}`, {
      title,
      body,
      description,
      subject
    }),
  createEmailTemplate: (title, body, description, subject) =>
    http.post(`${API_V1_URL}/email-templates`, {
      title,
      body,
      description,
      subject
    }),
  deleteEmailTemplate: emailTemplateId =>
    http.delete(`${API_V1_URL}/email-templates/${emailTemplateId}`)
});

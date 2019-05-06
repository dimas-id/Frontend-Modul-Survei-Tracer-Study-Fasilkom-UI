import http from "../../../../libs/http";
import {API_V1_URL} from "../config";
import {makeQueryUri} from "../../../../libs/navigation";

export default Object.freeze({
  getEmailTemplateList: () =>
    http.get(
      makeQueryUri(`${API_V1_URL}/email-templates`, {limit: 5000, offset: 0})
    ),
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
});

import http from "../../../../libs/http";
import { API_V3_URL } from "../config";

export default Object.freeze({
  saveTemplate: (key, title, subject, body) =>
    http.put(`${API_V3_URL}/email-templates/${key}`, {
      title: title,
      emailSubject: subject,
      emailBody: body,
    }),
  newTemplateFromBase: (title, subject, body) =>
    http.post(`${API_V3_URL}/email-templates/create`, {
      title: "Duplicate of " + title,
      emailSubject: subject,
      emailBody: body,
    }),
  newTemplate: () =>
    http.post(`${API_V3_URL}/email-templates/create`, {
      title: "New Template",
      emailSubject: "Your email subject",
      emailBody: "Your email body",
    }),
  deleteTemplate: key =>
    http.delete(`${API_V3_URL}/email-templates/${key}/delete`),
  listTemplates: () => http.get(`${API_V3_URL}/email-templates`),
});

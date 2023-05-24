import http from "../../../../libs/http";
import { API_V3_URL } from "../config";

export default Object.freeze({
  getPreviewEmail: (emailTemplateId, surveiId, recipients) =>
    http.post(`${API_V3_URL}/email-blaster/preview`, {
      emailTemplateId,
      surveiId,
      recipients,
    }),
  sendEmail: (emailTemplateId, surveiId, recipients) =>
    http.post(`${API_V3_URL}/email-blaster/send`, {
      emailTemplateId,
      surveiId,
      recipients,
    }),
  getEmailRecipients: (surveiId, groupRecipientYears, groupRecipientTerms, individualEmails) =>
    http.post(`${API_V3_URL}/email-blaster/recipients`, {
      surveiId,
      groupRecipientYears, 
      groupRecipientTerms, 
      individualEmails,
    }),
  getGroupTotal: (surveiId, year, term) =>
    http.get(`${API_V3_URL}/email-blaster/group-total`, {
      surveiId,
      year,
      term
    })
});

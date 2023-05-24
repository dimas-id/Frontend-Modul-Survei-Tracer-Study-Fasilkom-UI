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
  getEmailRecipients: (survei_id, group_recipients_years, group_recipients_terms, individual_recipients_emails) =>
    http.post(`${API_V3_URL}/recipients/get-all`, {
      survei_id,
      group_recipients_years, 
      group_recipients_terms, 
      individual_recipients_emails,
    }),
  getGroupTotal: (survei_id, year, term) =>
    http.post(`${API_V3_URL}/recipients/group-total`, {
      survei_id,
      year,
      term
    })
});

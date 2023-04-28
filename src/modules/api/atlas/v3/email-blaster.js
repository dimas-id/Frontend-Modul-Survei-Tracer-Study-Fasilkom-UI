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
});

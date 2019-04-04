export const ERROR_404 = "/404";
export const ERROR = "/err";
export const HOME = "/home";
export const LANDING = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const DONASI = "/donasi";
export const DONATION_FORM = `${DONASI}/:idProgram`
export const DONATION_REQUEST= `${DONASI}/ajukan-program`
export const CRM = '/CRM';
export const CRM_CONTACT = `${CRM}/contact`;
export const CRM_EMAIL_TEMPLATE_CREATE = `${CRM}/email-template/create`;
export const CHANNEL = "/channels";
export const CHANNEL_REQUEST = `${CHANNEL}/request`;
export const CHANNEL_REQUEST_LIST = `${CHANNEL}/request/list`;
export const CHANNEL_REQUEST_DETAIL = `${CHANNEL}/request/:channelId`;
export const CHANNEL_REQUEST_UPDATE = `${CHANNEL}/request/:channelId/update`;

export default {
  HOME,
  ERROR_404,
  ERROR,
  LOGIN,
  LANDING,
  REGISTER,
  DONASI,
  DONATION_FORM,
  DONATION_REQUEST,
  CRM_CONTACT,
  CRM_EMAIL_TEMPLATE_CREATE,
  CHANNEL,
  CHANNEL_REQUEST,
  CHANNEL_REQUEST_LIST,
  CHANNEL_REQUEST_DETAIL,
  CHANNEL_REQUEST_UPDATE,
};

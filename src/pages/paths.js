export const ERROR_404 = "/404";
export const ERROR = "/err";
export const HOME = "/home";
export const LANDING = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const DONASI = "/donasi";
export const DONATION_FORM = `${DONASI}/:idProgram`;
export const DONATION_REQUEST= `${DONASI}/ajukan-program`;
export const DONATION_PAYMENT_DETAIL = `${DONASI}/payment/:idPayment`;
export const CRM = '/CRM';
export const CRM_CONTACT = `${CRM}/contact`;
export const CHANNEL = "/channels";
export const CHANNEL_REQUEST = `${CHANNEL}/request`;
export const CHANNEL_REQUEST_LIST = `${CHANNEL}/request/list`;
export const USER_DONATION_LIST = `${DONASI}/transaksi/:idUser`;
export const CHANNEL_REQUEST_DETAIL = `${CHANNEL}/request/:channelId`;
export const CHANNEL_REQUEST_UPDATE = `${CHANNEL}/request/:channelId/update`;
export const CHANNEL_CHANT_CREATE = `${CHANNEL}/chant/create`;
export const CHANNEL_CHANT_UPDATE = `${CHANNEL}/chant/update`;
export const CHANNEL_CHANT = `${CHANNEL}/c/:channelId`;
export const USER_CHANT = `${CHANNEL}/users/:username`;
export const TIMELINE_CHANT = `${CHANNEL}/timeline`;

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
  DONATION_PAYMENT_DETAIL,
  CRM_CONTACT,
  CHANNEL,
  CHANNEL_REQUEST,
  CHANNEL_REQUEST_LIST,
  USER_DONATION_LIST,
  CHANNEL_REQUEST_DETAIL,
  CHANNEL_REQUEST_UPDATE,
  CHANNEL_CHANT_CREATE,
  CHANNEL_CHANT,
  CHANNEL_CHANT_UPDATE,
  USER_CHANT,
  TIMELINE_CHANT
};

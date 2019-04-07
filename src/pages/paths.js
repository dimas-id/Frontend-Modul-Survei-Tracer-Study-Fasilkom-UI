export const ERROR_404 = "/404";
export const ERROR = "/err";
export const HOME = "/users";
export const PROFILE = "/profil";
export const VERIFY = "/verify";
export const PREFERENCE = "/preferensi";
export const USER_PROFILE = `${HOME}${PROFILE}`;
export const USER_VERIFY = `${HOME}${VERIFY}`;
export const USER_PREFERENCE = `${HOME}${PREFERENCE}`;
export const LANDING = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const REGISTER_EXTERNAL = "/register-external-auths";
export const EDUCATION = "/pendidikan";
export const WORK_POSITION = "/pekerjaan";
export const REGISTER_EDUCATION = `${REGISTER}${EDUCATION}`;
export const REGISTER_WORK_POSITION = `${REGISTER}${WORK_POSITION}`;
export const REGISTER_PREFERENSI = `${REGISTER}${PREFERENCE}`;

export const DONASI = "/donasi";
export const DONATION_FORM = `${DONASI}/:idProgram`;
export const DONATION_REQUEST = `${DONASI}/ajukan-program`;
export const DONATION_PAYMENT_DETAIL = `${DONASI}/payment/:donationId`;
export const CRM = "/crm";
export const CRM_CONTACT = `${CRM}/contact`;
export const CRM_EMAIL_TEMPLATE_LIST = `${CRM}/email-template/list`;
export const CRM_EMAIL_TEMPLATE_CREATE = `${CRM}/email-template/create`;
export const CRM_EMAIL_TEMPLATE_UPDATE = `${CRM}/email-template/:idEmailTemplate`;
export const CHANNEL = "/channels";
export const CHANNEL_REQUEST = `${CHANNEL}/request`;
export const CHANNEL_REQUEST_LIST = `${CHANNEL}/request/list`;
export const USER_DONATION_LIST = `${DONASI}/users/:username`;
export const CHANNEL_REQUEST_DETAIL = `${CHANNEL}/request/:channelId`;
export const CHANNEL_REQUEST_UPDATE = `${CHANNEL}/request/:channelId/update`;
export const CHANNEL_CHANT_CREATE = `${CHANNEL}/chant/create`;
export const CHANNEL_CHANT_UPDATE = `${CHANNEL}/chant/update`;
export const CHANNEL_CHANT = `${CHANNEL}/c/:channelId`;
export const USER_CHANT = `${CHANNEL}/users/:username`;
export const TIMELINE_CHANT = `${CHANNEL}/timeline`;
export const CHANNEL_CHANT_DETAIL = `${CHANNEL}/c/:channelId/chants/:chantId`;
export const USER_DONATION_REQUEST_LIST = `${DONASI}/users/:username/pengajuan-donasi`;
export const DONATION_REQUEST_DETAIL = `${DONASI}/users/:username/pengajuan-donasi/:requestId`;

export default {
  HOME,
  PROFILE,
  USER_PROFILE,
  USER_VERIFY,
  USER_PREFERENCE,
  ERROR_404,
  ERROR,
  LOGIN,
  LANDING,
  REGISTER,
  EDUCATION,
  WORK_POSITION,
  PREFERENCE,
  REGISTER_EDUCATION,
  REGISTER_WORK_POSITION,
  REGISTER_PREFERENSI,
  DONASI,
  DONATION_FORM,
  USER_DONATION_REQUEST_LIST,
  DONATION_REQUEST,
  DONATION_PAYMENT_DETAIL,
  CRM_CONTACT,
  CRM_EMAIL_TEMPLATE_LIST,
  CRM_EMAIL_TEMPLATE_CREATE,
  CRM_EMAIL_TEMPLATE_UPDATE,
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
  TIMELINE_CHANT,
  CHANNEL_CHANT_DETAIL,
  REGISTER_EXTERNAL,
  DONATION_REQUEST_DETAIL,
};

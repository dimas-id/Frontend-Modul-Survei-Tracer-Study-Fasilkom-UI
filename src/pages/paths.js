exports.ERROR_404 = "/404";
exports.ERROR = "/err";
exports.HOME = "/u";
exports.PROFILE = "/profil";
exports.VERIFY = "/verify";
exports.PREFERENCE = "/preferensi";
exports.VOTING = "/voting";
exports.VOTING_RESULT = "/voting/result"
exports.USER_PROFILE = `${exports.HOME}${exports.PROFILE}`;
exports.USER_VERIFY = `${exports.HOME}${exports.VERIFY}`;
exports.USER_PREFERENCE = `${exports.HOME}${exports.PREFERENCE}`;
exports.USER_VOTING = `${exports.HOME}${exports.VOTING}`;
exports.USER_VOTING_RESULT = `${exports.HOME}${exports.VOTING_RESULT}`;
exports.LANDING = "/";
exports.LOGIN = "/login";
exports.REGISTER = "/register";
exports.REGISTER_EXTERNAL = "/register-external-auths";
exports.EDUCATION = "/pendidikan";
exports.WORK_POSITION = "/pekerjaan";
exports.REGISTER_EDUCATION = `${exports.REGISTER}${exports.EDUCATION}`;
exports.REGISTER_WORK_POSITION = `${exports.REGISTER}${exports.WORK_POSITION}`;
exports.REGISTER_PREFERENSI = `${exports.REGISTER}${exports.PREFERENCE}`;
exports.DONASI = "/donasi";
exports.DONATION_FORM = `${exports.DONASI}/:idProgram`;
exports.DONATION_REQUEST = `${exports.DONASI}/ajukan-program`;
exports.DONATION_PAYMENT_DETAIL = `${exports.DONASI}/payment/:donationId`;
exports.CRM = "/crm";
exports.CRM_MAILER = `${exports.CRM}/mailer`;
exports.CRM_CONTACT = `${exports.CRM}/contact`;
exports.CRM_EMAIL_TEMPLATE_LIST = `${exports.CRM}/email-template/list`;
exports.CRM_EMAIL_TEMPLATE_CREATE = `${exports.CRM}/email-template/create`;
exports.CRM_EMAIL_TEMPLATE_UPDATE = `${
  exports.CRM
}/email-template/:idEmailTemplate`;
exports.CRM_EMAIL_BATCH_CREATE = `${exports.CRM}/mailer/create`;
exports.CRM_EMAIL_BATCH_UPDATE = `${exports.CRM}/mailer/update/:batchId`;
exports.CHANNEL = "/channels";
exports.CHANNEL_REQUEST = `${exports.CHANNEL}/request`;
exports.CHANNEL_REQUEST_LIST = `${exports.CHANNEL}/request/list`;
exports.USER_DONATION_LIST = `${exports.DONASI}/users/:username`;
exports.CHANNEL_REQUEST_DETAIL = `${exports.CHANNEL}/request/:channelId`;
exports.CHANNEL_REQUEST_UPDATE = `${exports.CHANNEL}/request/:channelId/update`;
exports.CHANNEL_CHANT_CREATE = `${exports.CHANNEL}/c/:channelId/chant/create`;
exports.CHANNEL_CHANT_UPDATE = `${
  exports.CHANNEL
}/c/:channelId/chant/:chantId/update`;
exports.CHANNEL_CHANT = `${exports.CHANNEL}/c/:channelId`;
exports.USER_CHANT = `${exports.CHANNEL}/users/:username`;
exports.TIMELINE_CHANT = `${exports.CHANNEL}/timeline`;
exports.CHANNEL_CHANT_DETAIL = `${
  exports.CHANNEL
}/c/:channelId/chants/:chantId`;
exports.USER_DONATION_REQUEST_LIST = `${
  exports.DONASI
}/users/:username/pengajuan-donasi`;
exports.DONATION_REQUEST_DETAIL = `${
  exports.DONASI
}/users/:username/pengajuan-donasi/:requestId`;
exports.DONATION_REQUEST_UPDATE = `${
  exports.DONASI
}/users/:username/pengajuan-donasi/:requestId/update`;
exports.ALUMNI = "/alumni"
exports.ALUMNI_SEARCH = `${exports.ALUMNI}/search`;
exports.ALUMNI_DETAIL = `${exports.ALUMNI}/detail/:idAlumni`;
exports.GENERATE_USER = `/generate-user`;
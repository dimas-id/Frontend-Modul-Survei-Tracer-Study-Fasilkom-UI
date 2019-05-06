import get from "lodash/get";

export function getMailerState(state) {
  return get(state, "mailer");
}

export function getTemplateTags(state) {
  return get(state, "mailer.tags");
}

export function getTemplateHtmlTags(state) {
  return get(getTemplateTags(state), "htmlTags");
}

export function getTemplateFields(state) {
  return get(getTemplateTags(state), "fields");
}

export function getTemplateOperators(state) {
  return get(getTemplateTags(state), "operators");
}

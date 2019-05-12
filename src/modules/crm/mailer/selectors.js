import get from "lodash/get";

export function selectTemplateTags(state) {
  return get(state, "crm.mailer.tags");
}

export function selectTemplateHtmlTags(state) {
  return get(selectTemplateTags(state), "htmlTags");
}

export function selectTemplateFields(state) {
  return get(selectTemplateTags(state), "fields");
}

export function selectTemplateOperators(state) {
  return get(selectTemplateTags(state), "operators");
}

export function selectTemplates(state) {
  return get(state, "crm.mailer.templates");
}

export function selectTemplateById(state, templateId) {
  const arr = selectTemplates(state);
  if (!templateId || !Array.isArray(arr)) {
    return null;
  }
  return arr.find(val => val.id === templateId);
}

export function selectBatch(state) {
  return get(state, "crm.mailer.batch");
}

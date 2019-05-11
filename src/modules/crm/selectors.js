import get from "lodash/get";

export function selectContacts(state) {
  return get(state, "crm.contacts");
}

import get from "lodash/get";

export function getUtility(state) {
  return get(state, "utility");
}

export function isShowAlert(state) {
  return get(getUtility(state), "showAlert");
}

export function getAlert(state) {
  return get(getUtility(state), "alert");
}
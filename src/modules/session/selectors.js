import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

import { getDurationHourFromNow } from "commons/datetime";

export function getUser(state) {
  return get(state, "session.account", {});
}

export function getUserToken(state) {
  return get(state, "session.token", undefined);
}

export function isLoggedIn(state) {
  return !!getUserToken(state) && !isEmpty(getUser(state));
}

import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

export function getUser(state) {
  return get(state, "session.user", {});
}

export function getUserId(state) {
  return getUser(state).id
}

export function getUserAccessToken(state) {
  return get(state, "session.token.access", undefined);
}

export function getUserRefreshToken(state) {
  return get(state, "session.token.refresh", undefined);
}

export function isLoggedIn(state) {
  return !!getUserAccessToken(state) && !isEmpty(getUser(state));
}

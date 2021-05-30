import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

export function getUser(state) {
  return get(state, "session.user", {});
}

export function getUserId(state) {
  const user = getUser(state);
  return user && user.id;
}

export function getUserAccessToken(state) {
  return get(state, "session.token.access", undefined);
}

export function getUserRefreshToken(state) {
  return get(state, "session.token.refresh", undefined);
}

export function isLoggedIn(state) {
  return Boolean(getUserAccessToken(state)) && !isEmpty(getUser(state));
}

export function selectCurrentUserGroups(state) {
  return get(getUser(state), "groups");
}

export function getVotingResult(state) {
  // console.log(state)
  return [
    {
      id: 1000,
      year: 3
    }
  ]
  // return get(state, "sheets")
}

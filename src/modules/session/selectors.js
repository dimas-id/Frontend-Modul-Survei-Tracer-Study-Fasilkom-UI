import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { getDurationHourFromNow } from 'commons/datetime';
import { SESSION_TIME } from 'config/session';

export function getUserAccount(state) {
  return get(state, 'session.account', {});
}

export function getUserToken(state) {
  return get(state, 'session.token', undefined);
}

export function isLoggedIn(state) {
  return !!getUserToken(state) && !isEmpty(getUserAccount(state));
}

export function isOnSession(state) {
  const account = getUserAccount(state);
  return (
    !isEmpty(account) &&
    getDurationHourFromNow(account.last_login) < SESSION_TIME
  );
}

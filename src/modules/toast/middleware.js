import { toast } from 'react-toastify';
import { toastActions } from './index';
import { push } from 'react-router-redux';

export const toastMiddleware = store => next => async action => {
  try {
    return await next(action);
  } catch (e) {
    if (e.response) {
      const { body } = e.response;
      // token is not set, redirect to login
      if (body.detail === 'Authentication credentials were not provided.') {
        store.dispatch(push('/login'));
        return;
      }

      // or token has expired, redirect to logout
      if (body.detail === 'Invalid token.') {
        store.dispatch(push('/logout'));
        return;
      }

      if (body.detail) {
        toastActions.showErrorToast(body.detail);
        throw e;
      }

      if (body.non_field_errors) {
        toastActions.showErrorToast(body.non_field_errors[0]);
        throw e;
      }
    }

    if (window.navigator && !window.navigator.onLine) {
      toastActions.showErrorToast(
        'The internet connection appears to be offline, sorry ☹'
      );
    }

    throw e;
  }
};

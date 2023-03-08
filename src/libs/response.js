import pick from "lodash/pick";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

export function getNonFieldError(errResponse) {
  let err = get(errResponse, "nonFieldErrors", null);
  if (!isEmpty(err)) {
    let s = "";
    err.forEach(val => {
      s += `${val}\n`;
    });
    return s;
  }

  err = get(errResponse, "detail", null);
  if (!isEmpty(err)) {
    return err;
  }

  return errResponse;
}

/**
 * extract error response from vega api to make it more human (easy to use)
 * in frontend. Django Rest Framework return some different error response, depends
 * on how we handle error in backend.
 * @param {object} errResponse error response data from vega
 * @param {array} keys fields needed to extract from response
 */
export function humanizeError(errResponse, keys = []) {
  const res = pick(errResponse, keys);
  if (!isEmpty(res)) {
    keys.forEach(key => {
      if (key in res) {
        let s = "";
        res[key].forEach(sErr => {
          s += `${sErr}\n`;
        });
        res[key] = s;
      } else {
        res[key] = "";
      }
    });

    return res;
  }
  return getNonFieldError(errResponse);
}

/**
 * return status code from axios response
 * throw error if response doesnt contain status
 * @param {object} response response from axios
 */
export function getStatus(response) {
  return get(response, "status", undefined);
}

/**
 * return true if status code is success, false otherwise.
 * @param {object} response response from axios
 */
export function isStatusOK(response) {
  const status = getStatus(response);
  return status >= 200 && status < 300;
}

export function notFound(response) {
  const status = getStatus(response);
  return status === 404;
}

export function unauthorized(response) {
  const status = getStatus(response);
  return status === 401;
}

/**
 * return true if status code is between 400 and 500
 * @param {object} response response from axios
 */
export function isClientError(response) {
  const status = getStatus(response);
  return status >= 400 && status < 500;
}

const response = {
  humanizeError,
  isStatusOK,
  isClientError,
  getStatus,
};

export default response;

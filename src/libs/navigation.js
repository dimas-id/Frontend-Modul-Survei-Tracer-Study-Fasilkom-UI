import { isMobile, isMobileOnly } from "react-device-detect";
import qs from "qs";

export { isMobile };
export { isMobileOnly };

// need modern browser
export const isOnline = window.navigator && window.navigator.isOnline;

/**
 * replace react router path to uri
 * example: /inventories/:id => /inventories/1
 * @param {string} pathVariable route path with var inbetween
 * @param {object} variables key value of pathVariable
 */
export function makePathVariableUri(pathVariable, variables = {}) {
  const uries = pathVariable.split("/").map(uri => {
    let current = uri;
    if (uri.startsWith(":")) {
      const key = uri.substring(1);
      current = variables[key];
    }

    return current;
  });

  return uries.join("/");
}

export function makeQueryUri(path, params = {}, options = {}) {
  const query = qs.stringify(params, { addQueryPrefix: true, ...options });
  return `${path}${query}`;
}

export function withDeviceRenderer({ DesktopVersion, MobileVersion }) {
  if (isMobile && MobileVersion) {
    return MobileVersion;
  } else if (isMobile && !MobileVersion) {
    return DesktopVersion;
  } else if (!isMobile && !DesktopVersion) {
    return MobileVersion;
  }

  return DesktopVersion;
}

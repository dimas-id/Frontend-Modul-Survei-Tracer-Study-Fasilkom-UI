import { isMobile, isMobileOnly } from 'react-device-detect';

export { isMobile };
export { isMobileOnly };

// need modern browser
export const isOnline = window.navigator && window.navigator.isOnline;

/**
 * replace react router path to uri
 * example: /inventories/:id => /inventories/1
 * @param {string} pathVariable route path with var inbetween
 * @param {object} params key value of pathVariable
 */
export function makePathVariableUri(pathVariable, params = {}) {
  const uries = pathVariable.split('/').map(uri => {
    let current = uri;
    if (uri.startsWith(':')) {
      const key = uri.substring(1);
      current = params[key];
    }

    return current;
  });

  return uries.join('/');
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

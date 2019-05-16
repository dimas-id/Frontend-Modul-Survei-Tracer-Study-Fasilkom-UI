import axios from "axios";

export const http = axios.create({
  headers: {
    common: {
      "Accept-Language": "id"
    }
  }
});

export function setAuthToken(token) {
  const { common } = http.defaults.headers;
  if (token) {
    common.Authorization = `Bearer ${token}`;
  } else {
    common.Authorization = "";
  }
}

export default http;

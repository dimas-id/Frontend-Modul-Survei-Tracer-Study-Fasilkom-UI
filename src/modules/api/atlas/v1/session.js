import pick from "lodash/pick";
import http from "../../../../libs/http";
import { API_V1_URL } from "../config";

export default Object.freeze({
  login: (email, password) =>
    http.post(`${API_V1_URL}/tokens`, {
      email,
      password
    }),
  register: payload =>
    http.post(
      `${API_V1_URL}/register`,
      pick(payload, [
        "email",
        "password",
        "firstName",
        "lastName",
        "birthdate",
        "latestCsuiProgram",
        "latestCsuiClassYear",
        "npm"
      ])
    ),
  refreshToken: refresh =>
    http.post(`${API_V1_URL}/tokens/refresh`, { refresh }),
  getUserById: userId => http.get(`${API_V1_URL}/users/${userId}`),
  patchUserById: (userId, payload) =>
    http.patch(`${API_V1_URL}/users/${userId}`, payload)
});

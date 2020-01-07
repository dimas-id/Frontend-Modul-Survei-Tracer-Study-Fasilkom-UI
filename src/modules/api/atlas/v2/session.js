import pick from "lodash/pick";
import http from "../../../../libs/http";
import { API_V2_URL } from "../config";

export default Object.freeze({
  register: payload =>
    http.post(
      `${API_V2_URL}/register`,
      pick(payload, [
        "email",
        "password",
        "firstName",
        "lastName",
        "birthdate",
        "linkedinUrl",
      ])
    ),
});

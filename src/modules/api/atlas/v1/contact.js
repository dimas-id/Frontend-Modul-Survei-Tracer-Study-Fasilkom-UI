import http from "../../../../libs/http";
import { makeQueryUri } from "../../../../libs/navigation";
import { API_V1_URL } from "../config";

export default Object.freeze({
  getContactList: (name, category) =>
    http.get(
      makeQueryUri(
        `${API_V1_URL}/contacts`,
        { name, category },
        { indices: false }
      )
    )
});

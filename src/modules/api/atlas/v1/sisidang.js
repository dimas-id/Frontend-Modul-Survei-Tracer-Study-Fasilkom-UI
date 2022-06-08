import http from "../../../../libs/http";
import { makeQueryUri } from "../../../../libs/navigation";
import { API_V1_URL } from "../config";

export default Object.freeze({
  getSisidangDataList: (
    tahun,
    term,
    params = { limit: 5000, offset: 0 } // Asumsi alumni < 500
  ) =>
    http.get(
      makeQueryUri(
        `${API_V1_URL}/external-auths/sisidang`,
        {
          tahun,
          term,
          ...params,
        },
        { indices: false }
      )
    ),
});
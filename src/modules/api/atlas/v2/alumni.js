import http from "../../../../libs/http";
import { makeQueryUri } from "../../../../libs/navigation";
import { API_V2_URL } from "../config";

export default Object.freeze({
  //TODO: sesuaiin dengan BE
  getAlumniList: (
    name,
    gender,
    residence_country,
    csui_class_year,
    csui_program,
    title,
    industry_name,
    company_name,
    params = { limit: 5000, offset: 0 } // Asumsi alumni < 500
  ) =>
    http.get(
      makeQueryUri(
        `${API_V2_URL}/search`,
        {
          name,
          gender,
          residence_country,
          csui_class_year,
          csui_program,
          title,
          industry_name,
          company_name,
          ...params,
        },
        { indices: false }
      )
    ),
});

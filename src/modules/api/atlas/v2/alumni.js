import http from "../../../../libs/http";
import { makeQueryUri } from "../../../../libs/navigation";
import { API_V2_URL } from "../config";

export default Object.freeze({
  getAlumniList: (
    name,
    gender,
    residence_country,
    csui_class_year,
    start_csui_graduation_term,
    start_csui_graduation_year,
    end_csui_graduation_term,
    end_csui_graduation_year,
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
          start_csui_graduation_term,
          start_csui_graduation_year,
          end_csui_graduation_term,
          end_csui_graduation_year,
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

import http from "../../../../libs/http";
import { API_V3_URL } from "../config";

export default Object.freeze({
  postSurvei: async (nama, deskripsi) => {
    return await http
      .post(`${API_V3_URL}/survei/create`, { nama, deskripsi })
      .then(response => {
        return {
          status: "success",
          data: response.data,
        };
      })
      .catch(err => {
        return { status: "error", data: err.message };
      });
  },
  getSurvei: http.get(`${API_V3_URL}/survei/list`)
});

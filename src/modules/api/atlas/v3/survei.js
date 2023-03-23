import http from "../../../../libs/http";
import { API_V3_URL } from "../config";

export default Object.freeze({
  postSurvei: async (json) => {
    return await http
      .post(`${API_V3_URL}/survei/create`, json)
      .then(response => {
        return {
          status: "success",
          data: response.data,
        };
      })
      .catch(err => {
        return { status: "error", data: 'Pastikan semua field terisi!!' };
      });
  },
  getSurvei: http.get(`${API_V3_URL}/survei/list`)
});

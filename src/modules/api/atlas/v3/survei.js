import http from "../../../../libs/http";
import { API_V3_URL } from "../config";

export default Object.freeze({
  postSurvei: async json => {
    return await http
      .post(`${API_V3_URL}/survei/create`, json)
      .then(response => {
        return response;
      })
      .catch(err => {
        return err.response;
      });
  },
  getSurvei: http.get(`${API_V3_URL}/survei/list`),
  getSurveiById: surveiId =>
    http.get(`${API_V3_URL}/survei/?survei_id=${surveiId}`),
  isiSurvei: async json => {
    return await http
      .post(`${API_V3_URL}/survei/isi`, json)
      .then(response => {
        return response;
      })
      .catch(err => {
        return err.response;
      });
  },
  getVisualisasiById: async surveiId => {
    return await http
      .get(`${API_V3_URL}/visualisasi/${surveiId}`)
      .then(res => {
        if (res.status === 404) {
          const data = {
            message: "Survey not found!",
            status: res.status,
          };

          return { message: data };
        } else if (res.status === 200) {
          const dataResponse = res.data;
          const data = {
            survei: dataResponse.survei.nama,
            deskripsi: dataResponse.survei.deskripsi,
            responden: dataResponse.responden,
            pertanyaan: dataResponse.pertayaan,
          };

          return { message: data, status: res.status };
        } else {
          const data = {
            message: "Not authorized!",
            status: res.status,
          };

          return { message: data };
        }
      })
      .catch(err => {
        return {status: err.response.status };
      });
  },
  deleteSurveiById: async surveiId => {
    return await http
      .delete(`${API_V3_URL}/survei/delete/?survei_id=${surveiId}`)
      .then(response => {
        return response;
      }).catch(err => {
        return err.response;
      })
  }
});

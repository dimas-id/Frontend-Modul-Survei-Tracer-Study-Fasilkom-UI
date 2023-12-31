import http from "../../../../libs/http";
import { API_V1_URL } from "../config";

export default Object.freeze({
  createPosition: (userId, payload) =>
    http.post(`${API_V1_URL}/users/${userId}/positions`, payload),
  getPositions: (userId, offset, limit) =>
    http.get(`${API_V1_URL}/users/${userId}/positions`, {
      params: {
        limit,
        offset,
      },
    }),
  updatePosition: (userId, positionId, payload) =>
    http.put(`${API_V1_URL}/users/${userId}/positions/${positionId}`, payload),
  deletePosition: (userId, positionId) =>
    http.delete(`${API_V1_URL}/users/${userId}/positions/${positionId}`),
  createEducations: (userId, payload) =>
    http.post(`${API_V1_URL}/users/${userId}/educations`, payload),
  getEducations: (userId, offset, limit) =>
    http.get(`${API_V1_URL}/users/${userId}/educations`, {
      params: {
        limit,
        offset,
      },
    }),
  createOtherEdu: (userId, payload) =>
    http.post(`${API_V1_URL}/users/${userId}/other_educations`, payload),
  getOtherEdus: (userId, offset, limit) =>
    http.get(`${API_V1_URL}/users/${userId}/other_educations`, {
      params: {
        limit,
        offset,
      },
    }),
  updateOtherEdu: (userId, otherEduId, payload) =>
    http.put(`${API_V1_URL}/users/${userId}/other_educations/${otherEduId}`, payload),
  deleteOtherEdu: (userId, otherEduId) =>
    http.delete(`${API_V1_URL}/users/${userId}/other_educations/${otherEduId}`),
});

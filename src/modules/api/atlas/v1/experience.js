import http from "../../../../libs/http";
import { API_V1_URL } from "../config";

export default Object.freeze({
  createPosition: (userId, payload) =>
    http.put(`${API_V1_URL}/users/${userId}/positions`, payload),
  getPositions: (userId, offset, limit) =>
    http.get(`${API_V1_URL}/users/${userId}/positions`, {
      params: {
        limit,
        offset
      }
    }),
  updatePosition: (userId, positionId, payload) =>
    http.put(`${API_V1_URL}/users/${userId}/positions/${positionId}`, payload)
});

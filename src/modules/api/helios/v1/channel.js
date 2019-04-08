import http from "../../../../libs/http";
import { API_V1_URL } from "../config";

export default Object.freeze({
  getChannelDetail: channelId =>
    http.get(`${API_V1_URL}/channels/${channelId}`),
  getListChant: channelId =>
    http.get(`${API_V1_URL}/channels/${channelId}/chants`),
  getListChantReply: (channelId, chantId) =>
    http.get(`${API_V1_URL}/channels/${channelId}/chants/${chantId}`),
  getListChannel: () => http.get(`${API_V1_URL}/channels`),
  getListChantUser: userId => http.get(`${API_V1_URL}/users/${userId}/chants`),
  getTimeline: () => http.get(`${API_V1_URL}/timeline`),
  getChantDetail: (userId, chantId) =>
    http.get(`${API_V1_URL}/users/${userId}/chants/${chantId}`),
  getChantDetail: (userId, chantId) =>
    http.get(`${API_V1_URL}/users/${userId}/chants/${chantId}`),
  postChant: (userId, channel, parentChant, title, body) =>
    http.post(`${API_V1_URL}/users/${userId}/chants`, {
      title,
      body,
      channel,
      parentChant
    }),
  updateChant: (userId, chantId, title, body) =>
    http.patch(`${API_V1_URL}/users/${userId}/chants/${chantId}`, {
      title,
      body
    }),
  deleteChant: (userId, chantId) =>
    http.delete(`${API_V1_URL}/users/${userId}/chants/${chantId}`),
  getChannelRequestList: userId =>
    http.get(`${API_V1_URL}/users/${userId}/channel-requests/`),
  getChannelRequestDetail: (userId, channelId) =>
    http.get(`${API_V1_URL}/users/${userId}/channel-requests/${channelId}`),
  createChannelRequest: (userId, coverImgUrl, title, description) =>
    http.post(`${API_V1_URL}/users/${userId}/channel-requests/`, {
      coverImgUrl,
      title,
      description
    }),
   updateChannelRequest: (userId, channelId, coverImgUrl, title, description) =>
   http.patch(`${API_V1_URL}/users/${userId}/channel-requests/${channelId}`, {
       coverImgUrl,
       title,
       description
   }), 
});

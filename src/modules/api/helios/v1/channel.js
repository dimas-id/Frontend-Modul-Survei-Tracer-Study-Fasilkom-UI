import http from "../../../../libs/http";
import { API_V1_URL } from "../config";
import { makeQueryUri } from "../../../../libs/navigation";

export default Object.freeze({
  getChannelDetail: channelId =>
    http.get(`${API_V1_URL}/channels/${channelId}`),
  getListChant: channelId =>
    http.get(`${API_V1_URL}/channels/${channelId}/chants`),
  getListChantReply: (channelId, chantId) =>
    http.get(`${API_V1_URL}/channels/${channelId}/chants/${chantId}`),
  getListChannel: () => http.get(`${API_V1_URL}/channels`),
  getListChantUser: userId => http.get(`${API_V1_URL}/users/${userId}/chants`),
  getTimeline: (limit = 100, offset = 0) => 
    http.get(makeQueryUri(`${API_V1_URL}/timeline`, { limit, offset })),
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
  likeChant: chantId => http.post(`${API_V1_URL}/chants/${chantId}/like`),
  unlikeChant: chantId => http.post(`${API_V1_URL}/chants/${chantId}/unlike`),
  getNumberOfChantsUser: () => http.get(`${API_V1_URL}/me`),
  subscribeChannel: channelId =>
    http.post(`${API_V1_URL}/channels/${channelId}/subscribe`),
  unsubscribeChannel: channelId =>
    http.post(`${API_V1_URL}/channels/${channelId}/unsubscribe`),
  createChannelRequest: (userId, coverImgUrl, title, description) =>
    http.post(`${API_V1_URL}/users/${userId}/channel-requests/`, {
      coverImgUrl,
      title,
      description
    }),
  getChannelRequestList: userId =>
    http.get(`${API_V1_URL}/users/${userId}/channel-requests/`),
  getChannelRequestDetail: (userId, channelId) =>
    http.get(`${API_V1_URL}/users/${userId}/channel-requests/${channelId}`),
  updateChannelRequest: (userId, channelId, coverImgUrl, title, description) =>
    http.patch(`${API_V1_URL}/users/${userId}/channel-requests/${channelId}`, {
      coverImgUrl,
      title,
      description
    }),
  deleteChannelRequest: (userId, channelId) =>
    http.delete(`${API_V1_URL}/users/${userId}/channel-requests/${channelId}`)
});

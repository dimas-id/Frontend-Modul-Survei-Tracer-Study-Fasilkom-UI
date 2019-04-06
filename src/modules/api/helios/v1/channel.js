import http from "../../../../libs/http";
import { API_V1_URL } from "../config";

export default Object.freeze({
    getChannelDetail: channelId => http.get(`${API_V1_URL}/channels/${channelId}`),
    getListChant: channelId => http.get(`${API_V1_URL}/channels/${channelId}/chants`),
    getListChantReply: (channelId, chantId) => http.get(`${API_V1_URL}/channels/${channelId}/chants/${chantId}`),
    getListChannel: () => http.get(`${API_V1_URL}/channels`),
    getListChantUser: userId => http.get(`${API_V1_URL}/users/${userId}/chants`),
    getChannelRequestList: userId => http.get(`${API_V1_URL}/users/${userId}/channel-requests/`)
})
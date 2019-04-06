import http from "../../../../libs/http";
import { API_V1_URL } from "../config";

export default Object.freeze({
    getContactList: () => http.get(`${API_V1_URL}/contacts` )
})
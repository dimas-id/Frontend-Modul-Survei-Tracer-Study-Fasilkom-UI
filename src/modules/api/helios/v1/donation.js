import http from "../../../../libs/http";
import { API_V1_URL } from "../config";

export default Object.freeze({
  getDonationProgramList: () => http.get(`${API_V1_URL}/donation-programs`),

  getDonationProgramDetail: donationId =>
    http.get(`${API_V1_URL}/donation-programs/${donationId}`),

  getUserDonationList: userId =>
    http.get(`${API_V1_URL}/users/${userId}/donations`),

  getUserDonationDetail: (userId, donationId) =>
    http.get(`${API_V1_URL}/users/${userId}/donations/${donationId}`),

  getUserDonationRequestList: userId =>
    http.get(`${API_V1_URL}/users/${userId}/donation-programs`),

  getDonationProgramRequestDetail: (userId, donationId) =>
    http.get(`${API_V1_URL}/users/${userId}/donation-programs/${donationId}`),
  
  createDonation: (donationId, amount, bankNumberDest,bankNumberSource, estPaymentDate) =>
    http.post(`${API_V1_URL}/donation-programs/${donationId}/donate`, {
      amount, 
      bankNumberDest,
      bankNumberSource, 
      estPaymentDate
    }),
    // http://localhost:3113/donasi/2?amount=20000&bankNumberDest=0&bankNumberSource=1234567&estPaymentDate=2019-04-17
});

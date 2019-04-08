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

  createDonation: (
    donationId,
    amount,
    bankNumberDest,
    bankNumberSource,
    estPaymentDate
  ) =>
    http.post(`${API_V1_URL}/donation-programs/${donationId}/donate`, {
      amount,
      bankNumberDest,
      bankNumberSource,
      estPaymentDate
    }),
  createDonationRequest: (
    userId,
    categoryName,
    title,
    description,
    startDate,
    endDate,
    goalAmount,
    proposalUrl
  ) =>
    http.post(`${API_V1_URL}/users/${userId}/donation-programs`, {
      categoryName,
      title,
      description,
      startDate,
      endDate,
      goalAmount,
      proposalUrl
    })

});

import { GoogleSpreadsheet } from "google-spreadsheet";
import { SPREADSHEET_ID_CANDIDATES_VOTING_RESULT, CLIENT_EMAIL_CANDIDATES_VOTING_RESULT, PRIVATE_KEY_CANDIDATES_VOTING_RESULT } from "../../config";
export default class GoogleSheetsClient {
  constructor() {
    this.SPREADSHEET_ID = SPREADSHEET_ID_CANDIDATES_VOTING_RESULT;
    this.CLIENT_EMAIL = CLIENT_EMAIL_CANDIDATES_VOTING_RESULT;
    this.PRIVATE_KEY =  PRIVATE_KEY_CANDIDATES_VOTING_RESULT;
    console.log("SPREADSHEET ID: " + this.SPREADSHEET_ID);
    console.log("CLIENT_EMAIL ID: " + this.CLIENT_EMAIL);
    console.log("PRIVATE_KEY ID: " + this.PRIVATE_KEY);
    this.client = new GoogleSpreadsheet(this.SPREADSHEET_ID);
  }

  async get(sheet_id) {
    try {
      await this.client.useServiceAccountAuth({
        client_email: this.CLIENT_EMAIL,
        private_key: this.PRIVATE_KEY,
      });
      await this.client.loadInfo();
      const sheet = this.client.sheetsById[sheet_id];
      const data = await sheet.getRows();
      const result = []  
      data.forEach(element => {
        result.push({
          year: element["Nama"],
          population: Number.parseInt(element["Jumlah Pemilih"])
        })
      })
      // const result = [
      //   { year: '1950', population: 2.525 },
      //   { year: '1960', population: 3.018 },
      //   { year: '1970', population: 3.682 },
      //   { year: '1980', population: 4.440 },
      //   { year: '1990', population: 5.310 },
      //   { year: '2000', population: 6.127 },
      //   { year: '2010', population: 6.930 },
      // ]
      return result
    } catch (e) {
      console.error("Error: ", e);
    }
  }
}
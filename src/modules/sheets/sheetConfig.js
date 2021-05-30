import { GoogleSpreadsheet } from "google-spreadsheet";

export default class GoogleSheetsClient {
  constructor() {
    this.SPREADSHEET_ID = '1oXy_Et837fw4gt4SEu1GQuJAlqWDtrrQnWZewXXN-4M';
    this.CLIENT_EMAIL = 'sheets-read-only@iluni12.iam.gserviceaccount.com';
    this.PRIVATE_KEY =  "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC2YJU8rTNJ6fnv\nc7cauV9N9ND54bUoCDx87xgWXGzkMzTwHZzxwkqQZ6NLnrueqJRIu1YXKKG0n9yD\nrpKM9kFQ0ZqP/FrUD5yHFtwYCjiiRF3FQp0eAvCnFZImaXNfiky0YlJdjYM2vOhj\nuzFtHXBhl8afxudG9uVFvaEug0dvVeRTHUDrVzDSyXl/YyS4SdsO3J3IDdTB6OTs\nLdRB5a2KQluxxqKLwFAyf7cP8q00a+BfUr/BShzj587h/S82mrX3OqgenlhgYxTB\nwe2NRroRUXNetns92hylW6n5WobLFIiBsslyTzygO+7MX+0wBLPwxokzGQ1m94ds\nslJG696lAgMBAAECggEAMSESgr5rpxkrFZi39jCCnnb5Rp9JVEfnt4YXGIr8YHr0\n40wu56d9u6nXgPr5MtPZ4j/pAKMW8Jfx6N1BqEx8Kt/UAb6q3x53faKoVqeGOxws\noIOB3MBRAMmcTdGxXUbdw+gKpR4Gf1vjRF58gZbhG8EtpgQIcIL5H1DmlyeROknU\n4NjcLSYAcst/K6KwtZ0x4cvuODbywrd9R+LLuggFhL1ZIR3ZardRTGiz7THqkdkN\nGUFYT42M/nyaZK+vi8NK0FLdE46kBouKMka1QrWEEk85s7CUyv1gQ5kPWhScw1Fv\nEUJPfdfIAoH3yipV8SCUk1/xQo/ojZ6I1i/9efPtDwKBgQD6c3B6MJOS217PeBJc\nXuAUgSbD6calhwPoj+jGbiCTGTfaa6OZ13BNJw3M/Fwn1zp6+1wwQnc8j4PG6o0g\nH5GeWxHZJeDWDF4qaB1cvYSFMtyjhNZhZPhkmF74qaonfW4Yz0k+KmWOEAarFNUI\nefxMTH1RKaxyt2D1m+NXssn56wKBgQC6awdtGCFvKWENAebQmH3yKCa1Z49ChUky\n+oNeVjh2MoCIvCoWiXPoZYtMyl6lgCx9B3jgQ9SLDSXrdEsoryfpe2hHYqgKMhge\nL2AHPSABq4iGdwrzSgjJeTjE5kU8uk6jGxfyIY/pPivoSCPm1CSVb2Udsk1vAoP7\nA5H4/d1VrwKBgQDYQYe0qm8y1qMmSAqqoe2hJuffMOQrF8sjK+gWNw9/lL3qpxkM\nBL/ejsNW5e15JVpEyPiQX0PwEgf6YZtcSoYFk6N0ukVK7kD9Iwt/gdGE5icoNtKa\nJIJq8jrHQlE/agn/+DTJLfik02e+n+1XNWXKSB3JUE+senWJfoKuvh2y4wKBgHUe\n/2hsS71CeyYn9rNBy4dT8JXyfZBmm0m7GMQxWYHxUs4Voj/MlhUBj1ZsorBKaikX\ng7srAqNmXFelFf92pJXNogOPmVHmjT6Rtzx1C+HguoL40dluvzyNu7wBjKiNyRAy\n2oWWzorVM9LZWC0TRfTZKudQedPv+anAYXrVTLUjAoGBANKA8tHN3OWA61Y53ljV\nPIJ+wGVs5iMaBxQYbVAxz3v01Pk+dalfHFcnq4pvJblHotVsc60sB7KnL1ySrJ6U\n1RWUcs/1rvepUK6Jhqca8sGP0g2g9PN5xiM7mCv19gsGCgkfM7jslbx7Al3EaSY0\nDQQTmPh31fno1jx54dPQAs9q\n-----END PRIVATE KEY-----\n"

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
      return await sheet.getRows();
    } catch (e) {
      console.error("Error: ", e);
    }
  }
}
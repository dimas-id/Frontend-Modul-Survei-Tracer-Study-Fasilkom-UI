import { GoogleSpreadsheet } from "google-spreadsheet";

export default class GoogleSheetsClient {
  constructor() {
    this.SPREADSHEET_ID = '1upMOXhKXML4icqG2Np6hKmKpUsmFwfN9qb0FmT9cmys';
    this.CLIENT_EMAIL = 'iluni12@iluni12.iam.gserviceaccount.com';
    this.PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDEgs0jZ3IGsRzG\nswiCQ2tEzOSuhuvvep9gmONsWCWaZPntPgO4adCRqEAz8Y2eGAY1LhlYH0/Z5psN\nstBwlmqp7T1Ypp8t4NHiqlVsY9WywBOEV2KqyfTG8sLHQFsIDOv6IgvsIebJQF4+\nMTVRtKCSeeALq5rH6X8UNTozY2Ar0Prs5/9jn4bD5jriQ+sy37da28vU+hVEuRLH\n2A2+4NWSuhJAZ7WL1ZwjhMXo7nQKW27dD8xn0rs1BXYvwamOkrWgzR3MXodwJX8a\n6OkVxMT96i7rqe8dGuVrE7Dew9JDiEZi3NY+NIbc3BygeRsTdtxCG0T0g3VtCKQL\nC9fA6tMJAgMBAAECggEAShNmgdiOVrBwAQTfCb+hUYONFq8chB8ssgyf+ij2L8+t\nmL0+SMd2jFmorgv5zuUOfgB9JEdVYfX4b/7+bNp+pcSc0eypZ3FunOuJnPy7QxD9\nqm8IbgoIH/DF9LcxOYUpdRZdeStEZIvDmt0Q1NZqixyvFKchBwfhU/xGjrWAvLL1\n9ZzXVXx8fC+MLDB38ITbybpn12jtgVouurcmXcuJlJ+CURhm/qhFGU981w8AAzeX\nnGQGgLJJVUANyjTzWKomGMCULNkT7soHMTvM/gxVhWbYQepsVvKPtd7k3mXDU17g\nsv9S4yIsyHL3tyaMzQglksJAdhQbDM7ehbuhoR1sSwKBgQD2QTJRc8kM0xq5+XEs\n9Z9zX8Y2tIxe8K/xu8u8zI/ks+JYTyU5Cg1eXJ31VwbOcS6ZrHS1PGQPIK64cZKu\ndQP4uQhkkLr3QOJuSQXs4/RtiRFC7sNuBJ4Wi1QkmzJh+GRql6TkFqz7bCII0eqY\nXsibpldJF7eaQ7/uSxAbOEjfrwKBgQDMSabMqdX9VcrkxTC6wfHayP7Hdt/y+huq\nrsGDhW7xC4OxQJ0Ea7JuScDEbggXUGH9Kc/SNHxy5MlcNrOv/clB4LW0MpMFk9CT\nc6p0l7m5i5bWr2McSm44pQSMmQK4EWCiQeZbq70UAZjT39FdWSJDtTO8W5X29E/U\nq6fefoSuxwKBgDUhg/XHAY3ezllp1F1a8Xg3JdEPy2mAjLWfSyoFCNbTaPacvO89\nl/zQBtS0XieUi/VkHBouWXhaGNh6yKcTYDP92C26fFx0h2Y8IyclV8t6U1sZoNjP\n7jv2+8SaJ5izuxa0eUMtEU192yoEAJW3fZj3nsWKdHa4P2TulR8KWc7JAoGAW2zy\n21F+1VvZ67xcbJhztuiRLY+D9mf8jcycClJjLjlq/J7gJqRUPIuBW+eqc1SkJfra\naUbYE0tU2pIYpMC9m2AHsdeYeLyIchUnyfpFQka4gOgJQRYGcg9YE9w+nUYZq0Q2\n5fvcKOH2FYxrVI2ZihfESZ3rZZQ9Tf5sqGSS2O0CgYEAnjMlEabg1ulWzx0cFk92\nmNO4yd7GmE6JTYj5V8l4mhIIub0ITNbkXt3n8ODl2oKoSNI90gCC/NrpKXRmD4Hl\nJJllWAdWWQvUddmCnqTz8H9XdbXab3DAFfgbEcHcGfoAjSa9OAyVV4QcGHafbtLX\n+Sp1LDAwCp7hftljG5cG4AI=\n-----END PRIVATE KEY-----\n";

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
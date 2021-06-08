import { Form } from "formik";

export const isDevelopment = process.env.NODE_ENV === "development";
export const PUBLIC_URL = process.env.PUBLIC_URL;
export const ROOT_URL = "https://iluni12.cs.ui.ac.id";
export const METABASE_URL = "https://metabase-iluni12.cs.ui.ac.id";
export const JOTFORM_ID_CANDIDATES_VOTING_FORM = process.env.REACT_APP_JOTFORM_ID_CANDIDATES_VOTING_FORM
export const SPREADSHEET_ID_CANDIDATES_VOTING_RESULT = process.env.REACT_APP_SPREADSHEET_ID_CANDIDATES_VOTING_RESULT;
export const CLIENT_EMAIL_CANDIDATES_VOTING_RESULT = process.env.REACT_APP_CLIENT_EMAIL_CANDIDATES_VOTING_RESULT;
export const PRIVATE_KEY_CANDIDATES_VOTING_RESULT = process.env.REACT_APP_PRIVATE_KEY_CANDIDATES_VOTING_RESULT;
window.deprecationWarning =
  process.env.NODE_ENV !== "production"
    ? function(message) {
        console.warn(`DEPRECATION WARNING: ${message}`);
      }
    : function() {};

const developmentConstants = () => {
  const env = {
    ATLAS: "https://atlas-iluni12.cs.ui.ac.id",
    HELIOS: "http://localhost:8004"    
  };
  console.log("--- b3: development environment ---");
  console.log(`--- ${JSON.stringify(env, null, 2)}  ---`);
  return env;
};

const productionConstants = () => ({
  ATLAS: "https://atlas-iluni12.cs.ui.ac.id",
  HELIOS: "https://helios-iluni12.cs.ui.ac.id"
});

const constants = () => {
  if (isDevelopment) return developmentConstants();
  return productionConstants();
};

export default constants();

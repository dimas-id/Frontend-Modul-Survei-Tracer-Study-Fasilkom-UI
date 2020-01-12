export const isDevelopment = process.env.NODE_ENV === "development";
export const PUBLIC_URL = process.env.PUBLIC_URL;
export const ROOT_URL = "https://iluni12.cs.ui.ac.id";
export const METABASE_URL = "https://metabase-iluni12.cs.ui.ac.id"

window.deprecationWarning =
  process.env.NODE_ENV !== "production"
    ? function(message) {
        console.warn(`DEPRECATION WARNING: ${message}`);
      }
    : function() {};

const developmentConstants = () => {
  const env = {
    ATLAS: "http://localhost:8000",
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

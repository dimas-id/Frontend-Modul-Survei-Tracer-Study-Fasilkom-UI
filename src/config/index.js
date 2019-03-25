export const isDevelopment = process.env.NODE_ENV === 'development';

const developmentConstants = () => {
  const env = {
    ATLAS: 'http://localhost:8000',
    HELIOS: 'http://localhost:8004'
  };
  console.log('--- b3: development environment ---');
  console.log(`--- ${JSON.stringify(env, null, 2)}  ---`);
  return env;
};

const productionConstants = () => ({
  ATLAS: '',
  HELIOS: ''
});

const constants = () => {
  if (isDevelopment) return developmentConstants();
  return productionConstants();
};

export default constants();

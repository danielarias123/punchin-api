import { initializeEnvironment } from './environment';

// Load environment variables from .env file
initializeEnvironment();

const getDataBaseURI = () => {
  const {
    MONGO_DB_DSN,
    MONGO_DB_NAME,
    MONGO_DB_USER,
    MONGO_DB_PASSWORD,
  } = process.env;

  return `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_DSN}/${MONGO_DB_NAME}`;
};

export {
  getDataBaseURI,
};

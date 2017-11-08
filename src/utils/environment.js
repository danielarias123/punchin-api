import env from 'node-env-file';

const initializeEnvironment = () => {
  // Load environment variables from .env file
  env('.env');
};

export {
  initializeEnvironment,
};

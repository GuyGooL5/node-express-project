interface Env {
  MODE: 'development' | 'production';
  PORT: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_NAME: string;
  JWT_SECRET: string;
}

const env: Env;

module.exports = env;

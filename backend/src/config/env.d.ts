interface Env {
  PORT: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_NAME: string;
}

const env: Env;

module.exports = env;

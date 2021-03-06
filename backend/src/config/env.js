const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  MODE: process.env.MODE ?? 'development',
  PORT: process.env.PORT ?? 5000,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
};

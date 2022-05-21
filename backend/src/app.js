const express = require('express');
const env = require('./config/env');
const { connect } = require('./config/database');

const { DB_HOST, DB_PASSWORD, DB_USERNAME, DB_NAME } = env;

connect(DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

const app = express();
const { PORT } = env;

app.get('/', (req, res) => {
  res.status(200).end('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

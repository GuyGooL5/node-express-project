const express = require('express');

const bodyParser = require('body-parser');

const {
  PORT,
  DB_HOST,
  DB_PASSWORD,
  DB_USERNAME,
  DB_NAME,
} = require('./config/env');
const { connect } = require('./config/database');

const apiRouter = require('./routes');

connect(DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err));

const app = express();

app.use(bodyParser.json());

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

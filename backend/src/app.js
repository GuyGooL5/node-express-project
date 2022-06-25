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

const run = async () => {
  try {
    await connect(DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME);
    console.log('Database connected');
  } catch (error) {
    console.log(error);
    exit(1);
  }

  const app = express();

  app.use(bodyParser.json());

  app.use('/api', require('./routes'));

  app.use(express.static(__dirname + '/dist'));
  app.use('*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
  });

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

run();

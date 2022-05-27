const env = require('./config/env');
const { connect } = require('./config/database');
const User = require('./models/User');
const Cost = require('./models/Cost');

const { DB_HOST, DB_PASSWORD, DB_USERNAME, DB_NAME } = env;

const run = async () => {
  const mongoose = await connect(DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME);
  console.log('Database connected');

  const user = new User({
    idNumber: '123456789',
    password: 'password',
    firstName: 'John',
    lastName: 'Doe',
    birthday: new Date(),
    maritalStatus: '',
  });

  mongoose.connection.close();
  console.log('Database disconnected');
};

run();

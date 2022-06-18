const env = require('./config/env');
const { connect } = require('./config/database');
const User = require('./models/User');
const Cost = require('./models/Cost');
const { use } = require('passport');

const { DB_HOST, DB_PASSWORD, DB_USERNAME, DB_NAME } = env;

const run = async () => {
  const mongoose = await connect(DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME);
  console.log('Database connected');

  const user = new User({
    idNumber: '320640329',
    password: 'password',
    firstName: 'Guy',
    lastName: 'Tsitsiashvili',
    birthday: new Date(1994, 11, 20),
    maritalStatus: 'almost_married',
  });
  await user.save();
  mongoose.connection.close();
  console.log('Database disconnected');
};

run();

const env = require('./config/env');
const { connect } = require('./config/database');
const User = require('./models/User');
const Cost = require('./models/Cost');

const { DB_HOST, DB_PASSWORD, DB_USERNAME, DB_NAME } = env;

const run = async () => {
  const mongoose = await connect(DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME);
  console.log('Database connected');

   const cost = await  Cost.create({
    category: 'other',
    description: 'bought database service',
    sum: 100,
    owner: '62892252a41c5e68d8f1a540',
  });

  await cost.save();

  mongoose.connection.close();
  console.log('Database disconnected');
};

run();

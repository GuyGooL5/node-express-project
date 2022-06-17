const env = require('./config/env');
const { connect } = require('./config/database');
const User = require('./models/User');
const Cost = require('./models/Cost');
const {addCost} = require('./logic/addCost');
const { MonthCost } = require("./models/MonthCost");

const { DB_HOST, DB_PASSWORD, DB_USERNAME, DB_NAME } = env;

const run = async () => {
  const mongoose = await connect(DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME);
  console.log('Database connected');

  const mc = new MonthCost({
    sum: 1234234,
    costs: [
      mongoose.Types.ObjectId('628923fbc2af21098366292a'),
      mongoose.Types.ObjectId('62aca80797e1a117e0c58165'),
      mongoose.Types.ObjectId('62892477ac9f851701162638'),
    ],
  })

  const user = new User({
    idNumber: '52345672332324',
    password: 'password',
    firstName: 'Baaasdf',
    lastName: 'Doewefwef',
    birthday: new Date(),
    monthlyCosts: {
      "01_2021": mc,
      "02_2021": mc,
    }
  });
  await user.save()
  // await addCost('food', 234, 'oweifj oweijf oweijfoiw ejf', '62a784b676f470febadc7710')

  await mongoose.connection.close();
  console.log('Database disconnected');
};

run();

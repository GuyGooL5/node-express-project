const env = require('./config/env');
const { connect } = require('./config/database');
const User = require('./models/User');
const addCost = require('./logic/addCost');

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
    maritalStatus: 'single',
    monthlyCosts: new Map(),
  });
  await user.save();
  // const user = new User({
  //   idNumber: '0151',
  //   password: 'password',
  //   firstName: '5555511',
  //   lastName: 'Doewefwef',
  //   birthday: new Date(),
  //   monthlyCosts: {},
  // });
  // const addedUser = await user.save()

  // const addedUser = await User.findOne({_id: mongoose.Types.ObjectId('62acd05b4000bec793b382db')})

  // await addCost({
  //   category: 'food',
  //   sum: 100,
  //   description: 'test',
  //   userObjectId: '62acd05b4000bec793b382db',
  // });

  // const user = await User.findOne({
  //   _id: mongoose.Types.ObjectId('62acd05b4000bec793b382db'),
  // });

  // const report = await user.getMonthCosts(6, 2022);
  // console.log(report);

  await mongoose.connection.close();
  console.log('Database disconnected');
};

run();

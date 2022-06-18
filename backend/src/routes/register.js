const User = require('../models/User');
const { generateToken } = require('../utils/auth');

const { withStopReturnErrorHandler } = require('../handlers/errorHandlers');

const register = async (req, res) => {
  const { idNumber, password, firstName, lastName, birthday, maritalStatus } =
    req.body;

  const user = new User({
    idNumber,
    password,
    firstName,
    lastName,
    birthday,
    maritalStatus,
  });

  try {
    await user.save();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }

  const token = generateToken({ userId: user.id });
  return res.status(201).json({ token });
};

module.exports = withStopReturnErrorHandler(register);

const mongoose = require('mongoose');

const connect = (username, password, host, dbName = 'test') => {
  const uri = `mongodb+srv://${username}:${password}@${host}/test?retryWrites=true&w=majority`;
  return mongoose.connect(uri, { useNewUrlParser: true, dbName });
};

module.exports = {
  connect,
};

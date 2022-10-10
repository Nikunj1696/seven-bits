const mongoose = require("mongoose");
const constants = require("../utils/constants");

const connect = async () => {
  const connection = await mongoose.connect(constants.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return connection.connection.db;
};

module.exports = connect;

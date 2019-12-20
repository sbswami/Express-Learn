const mongoose = require("mongoose");
const { logger, consoleLogger } = require('../logging/index');
require("dotenv").config();
mongoose.connect(process.env.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  logger.debug('MongoDB Connected in LOG FILE!');

  logger.error("The mongoURI is placed in env");
  logger.info("The mongoose is successfully connected.");
  logger.warn("The mongo  URI is not in the vault (vulnerable)");
  consoleLogger.addContext('key', 'value');
  consoleLogger.debug('HI FIVE');
  console.info('MongoDB Connected Successfully!!');
});
mongoose.connection.on('error', err => {
  console.error(`Error in mongoose Connection: ${err}`);
});
mongoose.connection.on("disconnected", () => {
  console.log('Mongoose Connection is Disconnected');
});
process.on('SIGINT', function() {
  mongoose.connection.close(() => {
    process.exit(0);
  });
});

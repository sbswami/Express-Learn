const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
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

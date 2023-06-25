const mongoose = require("mongoose");
const logger = require("../helpers/appLogger");

const DB = process.env.MONGODB_URL;

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    logger.info("Database Connected");
  })
  .catch((err) => {
    logger.error(err);
  });

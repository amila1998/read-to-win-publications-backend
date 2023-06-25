const fs = require("fs");
const path = require("path");
const logger = require("./appLogger");

const likeCountLogger = ({ logMessage, logFilePath, logsFolder }) => {
  try {
    // Check if the logs folder exists, create it if it doesn't
    if (!fs.existsSync(logsFolder)) {
      fs.mkdirSync(logsFolder);
    }

    // Append the log message to the log file
    fs.appendFile(logFilePath, logMessage, (err) => {
      if (err) throw err;
    });
  } catch (error) {
    logger.error(error);
  }
};

module.exports = likeCountLogger;

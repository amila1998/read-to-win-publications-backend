const winston = require("winston");
const fs = require("fs");
const path = require("path");
const logger = require("./appLogger");

const likeCountLogger = ({logMessage}) => {
  try {
    const timestamp = new Date()
      .toISOString()
      .replace(/[-:]/g, "")
      .slice(0, -5); // Get current timestamp
    const logFileName = `authors_likes_log_${timestamp}.log`;
    const logsFolder = path.join(process.cwd(), "logs");
    const logFilePath = path.join(logsFolder, logFileName);

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

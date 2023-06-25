const winston = require("winston");
const fs = require("fs");
const path = require("path");

const logsFolder = "logs";
const logFilePath = path.join(logsFolder, "app.log");

// Create logs folder if it doesn't exist
if (!fs.existsSync(logsFolder)) {
  fs.mkdirSync(logsFolder);
}

// Create a logger instance
const logger = winston.createLogger({
  level: "info", // Set the desired log level
  format: winston.format.combine(
    winston.format.timestamp(), // Added timestamp to the log entries
    winston.format.simple() // Used the default log format
  ),
  transports: [
    // Specify the transports (output) for the logs
    new winston.transports.Console(), // Output logs to the console
    new winston.transports.File({ filename: logFilePath }), // Output logs to a file (inside logs folder)
  ],
});

module.exports = logger;

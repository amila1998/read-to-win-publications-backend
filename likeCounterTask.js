const cron = require("node-cron");
const fs = require("fs");
const path = require("path");
const Book = require("./models/book");
const User = require("./models/user");

const task = cron.schedule("*/5 * * * *", async () => {
  try {
    // Fetch the like count for each author
    const authors = await User.find({ role: "author" }).select("-password");
    const books = await Book.find();

    // Generate the report/notification/log entry
    authors.forEach((author) => {
      const { firstName, lastName, email } = author;

      //send an email notification here or log the information to console/file
      console.log(`Author: ${firstName} ${lastName}, Email: ${email}`);

      // Construct the log message with date, time, author details, and like count
      const logMessage = `Author: ${firstName} ${lastName}, Email: ${email}\n`;

      const timestamp = new Date()
        .toISOString()
        .replace(/[-:]/g, "")
        .slice(0, -5); // Get current timestamp
      const logFileName = `log_${timestamp}.log`;
      const logsFolder = path.join(__dirname, "logs");
      const logFilePath = path.join(logsFolder, logFileName);

      // Check if the logs folder exists, create it if it doesn't
      if (!fs.existsSync(logsFolder)) {
        fs.mkdirSync(logsFolder);
      }

      // Append the log message to the log file
      fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) throw err;
      });
    });
  } catch (error) {
    console.error("Error in background task:", error);
  }
});

// Start the background task
task.start();

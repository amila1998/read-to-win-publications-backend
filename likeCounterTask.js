const cron = require("node-cron");
const path = require("path");
const logger = require("./helpers/appLogger");
const likeCountLogger = require("./helpers/likeCountLogger");
const mongoRepository = require("./database/mongoRepository");

const task = cron.schedule("*/5 * * * *", async () => {
  try {
    const timestamp = new Date()
      .toISOString()
      .replace(/[-:]/g, "")
      .slice(0, -5); // Get current timestamp
    const logFileName = `authors_likes_log_${timestamp}.log`;
    const logsFolder = path.join(process.cwd(), "logs");
    const logFilePath = path.join(logsFolder, logFileName);

    // Fetch the like count for each author
    const userProps = { role: "author" };
    const authors = await mongoRepository.user.findWithoutPassword(userProps);

    // Generate the report/notification/log entry
    authors.forEach(async (author) => {
      const { firstName, lastName, email } = author;
      const bookProps = { author };
      const authorPublishedBooks =
        await mongoRepository.book.find(bookProps);
      let bookLikedCount = []; // to store the count of likes for each book
      if (authorPublishedBooks.length > 0) {
        for (const book of authorPublishedBooks) {
          const likeProps = { book };
          const likes = await mongoRepository.like.find(likeProps);
          bookLikedCount.push(likes.length);
        }
      }
      let likeCount = 0;
      if (bookLikedCount.length > 0) {
        likeCount = bookLikedCount.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );
      }

      //send an email notification here or log the information to console/file
      console.log(
        `Author: ${firstName} ${lastName}, Email: ${email}, No of Publications: ${authorPublishedBooks.length}, Like Count: ${likeCount}`
      );

      // Construct the log message with date, time, author details, and like count
      const logMessage = `Author: ${firstName} ${lastName}, Email: ${email}, No of Publications: ${authorPublishedBooks.length}, Like Count: ${likeCount}\n`;
      likeCountLogger({ logMessage, logFilePath, logsFolder });
    });
  } catch (error) {
    logger.info(error);
  }
});

// Start the background task
task.start();

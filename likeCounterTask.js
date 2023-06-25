const cron = require("node-cron");
const fs = require("fs");
const path = require("path");
const Book = require("./models/book");
const User = require("./models/user");
const Like = require("./models/like");
const logger = require("./helpers/appLogger");
const likeCountLogger = require("./helpers/likeCountLogger");

const task = cron.schedule("*/1 * * * *", async () => {
  try {
    // Fetch the like count for each author
    const authors = await User.find({ role: "author" }).select("-password");

    // Generate the report/notification/log entry
    authors.forEach(async (author) => {
      const { _id, firstName, lastName, email } = author;
      const authorPublishedBooks = await Book.find({ author });
      let bookLikedCount = []; // to store the count of likes for each book
      if (authorPublishedBooks.length > 0) {
        for (const book of authorPublishedBooks) {
          const likes = await Like.find({ book });
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
      likeCountLogger({ logMessage });
    });
  } catch (error) {
    logger.info(error);
  }
});

// Start the background task
task.start();

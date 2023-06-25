const Book = require("../models/book");
const Like = require("../models/like");
const User = require("../models/user");

const bookController = {
  registerBook: async (req, res) => {
    try {
      const { isbn, category, title } = req.body;
      const userId = req.user.id;

      // get user
      const user = await User.findById(userId).select("-password");
      if (!user)
        return res.status(400).json({ msg: "User not found in the database" });

      // check fields
      if (!isbn || !category || !title)
        return res.status(400).json({ msg: "Some fields are missing" });

      // Create a new book instance
      const newBook = new Book({
        isbn,
        category,
        title,
        author: user,
      });
      

      // Save the book to the database
      await newBook.save();

      res.status(201).json({
        msg: "Book registered successfully",
      });
    } catch (error) {
      // Log an error
      logger.error(error);
      res.status(500).json({ msg: error.message });
    }
  },
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.find().populate({
        path: "author",
        select: "-password",
      });
      res.status(200).json(books);
    } catch (error) {
      // Log an error
      logger.error(error);
      res.status(500).json({ msg: error.message });
    }
  },
  getBookByISBN: async (req, res) => {
    try {
      const isbn = req.params.isbn;

      // Find the book in the database by ISBN number
      const book = await Book.findOne({ isbn }).populate({
        path: "author",
        select: "-password",
      });

      if (!book) {
        return res.status(400).json({ msg: "Book not found" });
      }

      res.status(200).json(book);
    } catch (error) {
      // Log an error
      logger.error(error);
      res.status(500).json({ msg: error.message });
    }
  },
  likeBook: async (req, res) => {
    try {
      const isbn = req.params.isbn;
      const book = await Book.findOne({ isbn }).populate("author");
      if (!book) return res.status(400).json({ msg: "Book not found" });

      const user = await User.findById(req.user.id);
      if (user._id === book.author._id)
        return res.status(400).json({ msg: "You can't like your own book" });

      const exitLike = await Like.findOne({ user, book });
      if (exitLike)
        return res.status(400).json({ msg: "You have already liked that book" });
      
      const newLike = new Like({
        user,
        book
      })

      await newLike.save();
      return res.status(200).json({ msg: "Thanks for your like" });;
    } catch (error) {
      // Log an error
      logger.error(error);
      res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = bookController;

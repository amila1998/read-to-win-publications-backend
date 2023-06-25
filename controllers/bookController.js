const Book = require("../models/book");
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
      res.status(500).json({ msg: error.message });
    }
  },
  getAllBooks: async (req, res) => {
    try {
    } catch (error) {}
  },
  getBookByISBN: async (req, res) => {
    try {
    } catch (error) {}
  },
};
module.exports = bookController;

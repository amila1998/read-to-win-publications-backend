const mongoRepository = require("../database/mongoRepository");
const createCategoryList = require("../helpers/createCategoryList");
const Book = require("../models/book");
const Like = require("../models/like");

const bookController = {
  registerBook: async (req, res) => {
    try {
      const { isbn, categories, title } = req.body;
      const userId = req.user.id;

      // get user
      const user = await mongoRepository.user.findByIdWithoutPassword(userId);
      if (!user)
        return res.status(400).json({ msg: "User not found in the database" });

      // check fields
      if (!isbn || !categories || !title)
        return res.status(400).json({ msg: "Some fields are missing" });

      const categoryList = await createCategoryList(categories);

      // Create a new book instance
      const newBook = new Book({
        isbn,
        categories: categoryList,
        title,
        author: user,
      });
      
      // Save the book to the database
      await mongoRepository.book.add(newBook);

      return res.status(201).json({
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
      const populates = {
        path: "author",
        select: "-password",
      };
      const books = await mongoRepository.book.findWithPopulates(populates);
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
      const populate = {
        path: "author",
        select: "-password",
      };
      const props = { isbn };
      const book = await mongoRepository.book.findOneWithPopulates(
        props,
        populate
      );

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
      const populate = "author";
      const props = { isbn };
      const book = await mongoRepository.findOneWithPopulates(props, populate);
      if (!book) return res.status(400).json({ msg: "Book not found" });

      const user = await mongoRepository.user.findByIdWithoutPassword(req.user.id);
      if (user._id === book.author._id)
        return res.status(400).json({ msg: "You can't like your own book" });

      const likeProps = { user, book };
      const exitLike = await mongoRepository.like.findOne(likeProps);
      if (exitLike)
        return res
          .status(400)
          .json({ msg: "You have already liked that book" });

      const newLike = new Like({
        user,
        book,
      });

      await mongoRepository.like.add(newLike);
      return res.status(200).json({ msg: "Thanks for your like" });
    } catch (error) {
      // Log an error
      logger.error(error);
      res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = bookController;

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9]+$/,
  },
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9\s]+$/,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;

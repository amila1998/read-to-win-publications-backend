const Book = require("../models/book");
const Like = require("../models/like");
const User = require("../models/user");

const mongoRepository = {
  user: {
    add: (props) => {
      return props.save();
    },
    find: () => {
      return User.find();
    },
    findWithoutPassword: () => {
      return User.find().select("-password");
    },
    findWithoutPassword: (props) => {
      return User.find(props).select("-password");
    },
    find: (props) => {
      return User.find(props);
    },
    findWithoutPassword: (props) => {
      return User.find(props).select("-password");
    },
    findOne: (props) => {
      return User.findOne(props);
    },
    findOneWithoutPassword: (props) => {
      return User.findOne(props).select("-password");
    },
    findById: (id) => {
      return User.findById(id);
    },
    findByIdWithoutPassword: (id) => {
      return User.findById(id).select("-password");
    },
  },
  book: {
    add: (props) => {
      return props.save();
    },
    find: () => {
      return Book.find();
    },
    find: (props) => {
      return Book.find(props);
    },
    findWithPopulates: (populates) => {
      return Book.find().populate(populates);
    },
    findOneWithPopulates: (props, populates) => {
      return Book.findOne(props).populate(populates);
    },
  },
  like: {
    add: (props) => {
      return props.save();
    },
    find: () => {
      return Like.find();
    },
    find: (props) => {
      return Like.find(props);
    },
    findOne: (props) => {
      return Like.findOne(props);
    },
  },
};
module.exports = mongoRepository;

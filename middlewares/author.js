const jwt = require("jsonwebtoken");
const User = require("../models/user");

const author = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({
        msg: "User Not Found.",
      });

    if (user.role != "author")
      return res.status(401).json({
        msg: "Author Authentication Failed !!.",
      });

    next();
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
};

module.exports = author;

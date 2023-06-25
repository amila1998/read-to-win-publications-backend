const jwt = require("jsonwebtoken");
const mongoRepository = require("../database/mongoRepository");

const author = async (req, res, next) => {
  try {
    const user = await mongoRepository.user.findById(req.user.id);
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

const { Router } = require("express");
const route = Router();
const bookController = require("../controllers/bookController");
const auth = require("../middlewares/auth");
const author = require("../middlewares/author");

route.post("/registerBook", auth, author, bookController.registerBook);

module.exports = route;

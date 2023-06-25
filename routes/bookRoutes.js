const { Router } = require("express");
const route = Router();
const bookController = require("../controllers/bookController");
const auth = require("../middlewares/auth");
const author = require("../middlewares/author");

route.post("/", auth, author, bookController.registerBook);
route.get("/:isbn", bookController.getBookByISBN);
route.get("/", bookController.getAllBooks);
route.post("/likeBook/:isbn", auth, bookController.likeBook);

module.exports = route;

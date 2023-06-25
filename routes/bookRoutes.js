const { Router } = require("express");
const route = Router();
const bookController = require("../controllers/bookController");
const auth = require("../middlewares/auth");
const author = require("../middlewares/author");

route.post("/registerBook", auth, author, bookController.registerBook);
route.get("/getBookByISBN/:isbn", bookController.getBookByISBN);
route.get("/getAllBooks", bookController.getAllBooks);
route.post("/likeBook/:isbn", auth, bookController.likeBook);

module.exports = route;

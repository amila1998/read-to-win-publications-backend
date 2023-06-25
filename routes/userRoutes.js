const { Router } = require("express");
const route = Router();
const userController = require("../controllers/userController");

route.post("/register", userController.register);
route.post("/signing", userController.signing);
route.post("/access", userController.access);
route.post("/signout", userController.signout);

module.exports = route;
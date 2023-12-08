const express = require("express");
const app = express.Router();
const userController = require("../controllers/user.js");
const authMiddleware = require("../controllers/authMiddleware.js");

app.post("/signin", userController.signin);
app.post("/signup", userController.signup);
app.post("/gsignin", userController.gsignup);
app.get("/getaccess", userController.gitsign);
app.get("/getUser", userController.getgit);
app.post("/type", authMiddleware,userController.types);
app.post("/card", authMiddleware,userController.cards);
app.get("/userdetail",authMiddleware,userController.userInfo);


module.exports = app;

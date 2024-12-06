const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const UserController = require("../controllers/userController");

// Rota pública para login
router.post("/login", authController.login);
router.post("/user", UserController.criar);
module.exports = router;

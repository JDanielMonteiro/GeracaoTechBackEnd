const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const UserController = require("../controllers/userController");

// Rota pública para login
router.post("/v1/token", authController.login);
router.post("/v1/user", UserController.criar);
module.exports = router;

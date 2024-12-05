const express = require("express");
const router = express.Router();
const usuarioRoutes = require("./usuarioRoutes");
const produtoRoutes = require("./produtoRoutes");
const authMiddleware = require("../middleware/authMiddleware");

// Rotas privadas
router.use(authMiddleware);
router.use("/user", usuarioRoutes);
router.use("/product", produtoRoutes);
module.exports = router;

const express = require("express");
const router = express.Router();
const usuarioRoutes = require("./usuarioRoutes");
const produtoRoutes = require("./produtoRoutes");
const categoryRoutes = require("./categoryRoutes");
const authMiddleware = require("../middleware/authMiddleware");
const CategoryController = require("../controllers/categoryController");

// Rotas privadas
router.use(authMiddleware);
router.use("/v1/user", usuarioRoutes);
router.use("/v1/product", produtoRoutes);
router.use("/v1/category", categoryRoutes);

// router.get("/v1/category/teste/", CategoryController.searchCategories);
module.exports = router;

const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/categoryController");

router.post("/", CategoryController.criar);
router.get("/:id", CategoryController.consultarPorId);
router.put("/:id", CategoryController.atualizar);
router.delete("/:id", CategoryController.excluir);
router.get("/", CategoryController.searchCategories);

module.exports = router;

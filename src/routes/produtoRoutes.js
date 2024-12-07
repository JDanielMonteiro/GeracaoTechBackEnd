const express = require("express");
const router = express.Router();
const produtoController = require("../controllers/produtoController");

router.get("/", produtoController.listar);
router.get("/:id", produtoController.listar);
router.get("/", produtoController.searchProducts);
router.post("/", produtoController.criar);
router.put("/:id", produtoController.atualizar);
router.delete("/:id", produtoController.excluir);

module.exports = router;

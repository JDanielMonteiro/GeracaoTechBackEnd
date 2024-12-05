const express = require("express");
const router = express.Router();
const produtoController = require("../controllers/produtoController");

router.get("/", function (req, res) {
  produtoController.listar;
});
router.get("/:id", function (req, res) {
  produtoController.listar;
});
router.post("/", function (req, res) {
  produtoController.adicionar;
});
router.put("/:id", function (req, res) {
  produtoController.editar;
});
router.delete("/:id", function (req, res) {
  produtoController.excluir;
});

module.exports = router;

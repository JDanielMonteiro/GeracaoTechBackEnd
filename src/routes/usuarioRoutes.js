const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

router.get("/:id", function (req, res) {
  usuarioController.consultarPorId;
});
router.post("/", function (req, res) {
  usuarioController.criar;
});
router.put("/:id", function (req, res) {
  usuarioController.atualizar;
});
router.delete("/:id", function (req, res) {
  usuarioController.excluir;
});

module.exports = router;

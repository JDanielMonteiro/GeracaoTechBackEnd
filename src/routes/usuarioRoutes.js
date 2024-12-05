const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

router.get("/:id", usuarioController.consultarPorId);
router.post("/", usuarioController.criar);
router.put("/:id", usuarioController.atualizar);
router.delete("/:id", usuarioController.excluir);

module.exports = router;

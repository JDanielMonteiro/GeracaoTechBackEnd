const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.get("/:id", UserController.consultarPorId);
router.put("/:id", UserController.atualizar);
router.delete("/:id", UserController.excluir);

module.exports = router;

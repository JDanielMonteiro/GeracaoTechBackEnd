const userService = require("../services/usuarioService");

class UserController {
  static async consultarPorId(req, res) {
    const id = req.params.id;
    try {
      const usuario = await userService.getUserById(id);

      if (usuario) {
        res.status(200).json({ usuario });
      } else {
        res.status(404).json({ message: "Usuário não encontrado" });
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async criar(req, res) {
    try {
      const { firstname, surname, email, password, confirmPassword } = req.body;

      if (password != confirmPassword) {
        res
          .status(400)
          .json({ error: "senha e senha de confirmação não são iguais" });
      }

      if (
        !id ||
        !firstname ||
        !surname ||
        !email ||
        !password ||
        !confirmPassword
      ) {
        res.status(400).json({ message: "Dados incorretos" });
      }

      const existeUsuario = await userService.getUserByEmail(email);
      if (existeUsuario) {
        res
          .status(500)
          .json({ error: "Ja existe usuário cadastrado com esse email" });
      }

      const newUser = await userService.createUser(
        firstname,
        surname,
        email,
        password,
        confirmPassword
      );
      res.status(201).json("Criado com sucesso!");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async atualizar(req, res) {
    try {
      const id = req.params.id;
      const dadosAtualizados = req.body;

      const usuario = await userService.getUserById(id);

      const { firstname, surname, email } = dadosAtualizados;
      if (!id || !firstname || !surname || !email) {
        res.status(400).json({ message: "Dados incorretos" });
      }
      if (!usuario) {
        res.status(404).json({ message: "Usuário não encontrado" });
      }

      userService.updateUser(id, dadosAtualizados);
      res.status(204).json({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
      if (error == "Usuário não encontrado")
        res.status(404).json({ error: error.message });

      res.status(400).json({ error: error.message });
    }
  }

  static async excluir(req, res) {
    try {
      const id = req.params.id;
      const usuario = await userService.getUserById(id);
      if (!usuario) {
        res.status(404).json({ message: "Usuário não encontrado" });
      }

      userService.excluir(id);
      res.status(204).json({ message: "Usuário excluído com sucesso" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UserController;

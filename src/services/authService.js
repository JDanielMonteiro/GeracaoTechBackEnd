// authService.js
const UsuarioService = require("./usuarioService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class AuthService {
  static async login(email, senha) {
    try {
      const user = await UsuarioService.getUserByEmail(email);

      if (!user) {
        return { status: 401, message: "Usuário não encontrado" };
      }

      const isMatch = await bcrypt.compare(senha, user.dataValues.password);

      if (isMatch) {
        const expiracao = Math.floor(Date.now() / 1000) + 60 * 60;

        const token = jwt.sign(
          { id: user.id, nome: user.firstname },
          process.env.APP_KEY_TOKEN,
          { expiresIn: expiracao }
        );

        return { status: 200, token };
      } else {
        return { status: 401, message: "Senha incorreta" };
      }
    } catch (error) {
      return { status: 500, message: "Erro no servidor" };
    }
  }
}

module.exports = AuthService;

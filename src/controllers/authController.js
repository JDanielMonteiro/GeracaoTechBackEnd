// authController.js
const AuthService = require("../services/authService");

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const result = await AuthService.login(email, password);

      if (result.status === 200) {
        res.status(200).json({ token: result.token });
      } else {
        res.status(result.status).json({ mensagem: result.message });
      }
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro no servidor", error: error.message });
    }
  }
}

module.exports = AuthController;

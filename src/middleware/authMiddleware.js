const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Obtém o cabeçalho Authorization
  let token = req.headers["authorization"];

  // Verifica se o token não está presente
  if (!token) {
    return res.status(403).json({ mensagem: "Token não fornecido" });
  }

  // Remove a palavra "Bearer " do token, caso esteja presente
  if (token.startsWith("Bearer ")) {
    token = token.replace("Bearer ", "");
  } else {
    return res.status(403).json({ mensagem: "Token mal formatado" });
  }

  try {
    // Verifica a autenticidade do token
    const decoded = jwt.verify(token, process.env.APP_KEY_TOKEN);
    console.log(decoded);

    // Armazena o ID do usuário no objeto `req` para uso posterior
    req.usuarioId = decoded.id;

    // Passa o controle para o próximo middleware ou rota
    next();
  } catch (err) {
    console.log(err);
    res.status(403).json({ mensagem: "Token inválido" });
  }
};

module.exports = authMiddleware;

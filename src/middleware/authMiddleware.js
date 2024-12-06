const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ mensagem: "Token não fornecido" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.replace("Bearer ", "");
  } else {
    return res.status(403).json({ mensagem: "Token mal formatado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.APP_KEY_TOKEN);
    req.usuarioId = decoded.id;

    next();
  } catch (err) {
    console.log(err);
    res.status(403).json({ mensagem: "Token inválido" });
  }
};

module.exports = authMiddleware;

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token === "meu-token-secreto") {
    next();
  } else {
    res.status(403).json({ mensagem: "Não autorizado" });
  }
};
module.exports = authMiddleware;

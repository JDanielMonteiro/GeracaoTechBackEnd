const jwt = require("jsonwebtoken");

const usuarios = [
  { id: 1, nome: "Admin", login: "admin", senha: "123456" },
  { id: 2, nome: "User", login: "user", senha: "123456" },
];

exports.login = (req, res) => {
  const { login, senha } = req.body;
  const usuario = usuarios.find(
    (user) => user.login === login && user.senha === senha
  );

  console.log(usuario);

  if (usuario) {
    const expiracao = Math.floor(Date.now() / 1000) + 60 * 60;

    // Gerando o token
    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome },
      process.env.APP_KEY_TOKEN, // Usando a chave do .env
      { expiresIn: expiracao }
    );
    res.json({ token });
  } else {
    res.status(401).json({ mensagem: "Login ou senha incorretos" });
  }
};

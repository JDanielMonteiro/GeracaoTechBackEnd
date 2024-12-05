const usuarios = [
  { id: 1, nome: "Usuário 1", senha: "senha1", token: "meu-token-secreto" },
  { id: 2, nome: "Usuário 2", senha: "senha2", token: "outro-token" },
];

const login = (req, res) => {
  const { nome, senha } = req.body;
  console.log(nome);
  console.log(senha);
  const usuario = usuarios.find((u) => u.nome === nome && u.senha === senha);

  if (usuario) {
    res.json({ token: usuario.token });
  } else {
    res.status(401).json({ mensagem: "Credenciais inválidas" });
  }
};

module.exports = { login };

class Usuario {
  static usuarios = [
    { id: 1, nome: "Admin", login: "admin" },
    { id: 2, nome: "Teste", login: "teste" },
  ];

  static consultarPorId(id) {
    return this.usuarios.find((usuario) => usuario.id == id);
  }

  static criar(usuario) {
    usuario.id = this.usuarios.length + 1;
    this.usuarios.push(usuario);
    return usuario;
  }

  static atualizar(id, dadosAtualizados) {
    const index = this.usuarios.findIndex((usuario) => usuario.id == id);
    if (index !== -1) {
      this.usuarios[index] = { ...this.usuarios[index], ...dadosAtualizados };
      return this.usuarios[index];
    }
    return null;
  }

  static excluir(id) {
    this.usuarios = this.usuarios.filter((usuario) => usuario.id != id);
    return this.usuarios[0];
  }
}

module.exports = Usuario;

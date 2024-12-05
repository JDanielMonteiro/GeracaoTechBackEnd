class Produto {
  static produtos = [];
  static listar() {
    return this.produtos;
  }
  static consultarPorId(id) {
    return this.produtos.find((usuario) => usuario.id == id);
  }

  static criar(produto) {
    produto.id = this.produtos.length + 1;
    this.produtos.push(produto);
  }

  static atualizar(id, dadosAtualizados) {
    const index = this.produtos.findIndex((usuario) => usuario.id == id);
    if (index !== -1) {
      this.produtos[index] = { ...this.produtos[index], ...dadosAtualizados };
    }
  }

  static excluir(id) {
    this.produtos = this.produtos.filter((p) => p.id !== id);
  }
}
module.exports = Produto;

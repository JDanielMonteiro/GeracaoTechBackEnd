const Produto = require("../models/produtoModel");

class ProdutoController {
  static listar(req, res) {
    res.status(200).json(Produto.listar());
  }

  static consultarPorId(req, res) {
    const id = req.params.id;
    const Produto = Produto.consultarPorId(id);
    if (Produto) {
      res.status(200).json(Produto);
    } else {
      res.status(404).json({ message: "Produto não encontrado" });
    }
  }

  static criar(req, res) {
    const novoProduto = req.body;
    Produto.criar(novoProduto);
    res.status(201).json({ message: "Produto criado com sucesso" });
  }

  static atualizar(req, res) {
    const id = req.params.id;
    const dadosAtualizados = req.body;
    Produto.atualizar(id, dadosAtualizados);
    res.status(200).json({ message: "Produto atualizado com sucesso" });
  }

  static excluir(req, res) {
    const id = req.params.id;
    Produto.excluir(id);
    res.status(200).json({ message: "Produto excluído com sucesso" });
  }
}

module.exports = ProdutoController;

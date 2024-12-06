const ProdutoService = require("../services/produtoService");

class ProdutoController {
  static listar(req, res) {
    res.status(200).json(ProdutoService.listar());
  }

  static consultarPorId(req, res) {
    const id = req.params.id;
    const ProdutoService = ProdutoService.consultarPorId(id);
    if (ProdutoService) {
      res.status(200).json(ProdutoService);
    } else {
      res.status(404).json({ message: "ProdutoService não encontrado" });
    }
  }

  static criar(req, res) {
    const novoProdutoService = req.body;
    ProdutoService.criar(novoProdutoService);
    res.status(201).json({ message: "ProdutoService criado com sucesso" });
  }

  static atualizar(req, res) {
    const id = req.params.id;
    const dadosAtualizados = req.body;
    ProdutoService.atualizar(id, dadosAtualizados);
    res.status(200).json({ message: "ProdutoService atualizado com sucesso" });
  }

  static excluir(req, res) {
    const id = req.params.id;
    ProdutoService.excluir(id);
    res.status(200).json({ message: "ProdutoService excluído com sucesso" });
  }
}

module.exports = ProdutoController;

const categoryService = require("../services/categoryService");

class CategoryController {
  static async criar(req, res) {
    try {
      const { name, slug, use_in_menu } = req.body;

      if (!name || !slug || !use_in_menu) {
        res.status(400).json({ message: "Dados incorretos" });
      }

      await categoryService.createCategory(name, slug, use_in_menu);
      res.status(201).json("Criado com sucesso!");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async consultarPorId(req, res) {
    const id = req.params.id;
    try {
      const category = await categoryService.getById(id);
      console.log("consultarPorId");

      if (category) {
        res.status(200).json({ category });
      } else {
        res.status(404).json({ message: "Categoria não encontrado" });
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  static async atualizar(req, res) {
    try {
      const id = req.params.id;
      const dadosAtualizados = req.body;

      const category = await categoryService.getById(id);

      const { name, slug, use_in_menu } = dadosAtualizados;
      if (!id || !name || !slug || !use_in_menu) {
        res.status(400).json({ message: "Dados incorretos" });
      }
      if (!category) {
        res.status(404).json({ message: "Categoria não encontrado" });
      }

      await categoryService.update(id, dadosAtualizados);
      res.status(204).json({ message: "Categoria atualizado com sucesso" });
    } catch (error) {
      if (error == "Categoria não encontrado")
        res.status(404).json({ error: error.message });

      res.status(400).json({ error: error.message });
    }
  }

  static async excluir(req, res) {
    try {
      const id = req.params.id;
      const category = await categoryService.getById(id);
      if (!category) {
        res.status(404).json({ message: "Categoria não encontrado" });
      }

      categoryService.excluir(id);
      res.status(204).json({ message: "Categoria excluído com sucesso" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async searchCategories(req, res) {
    try {
      const { limit = 12, page = 1, fields, use_in_menu } = req.query;

      const limitValue = parseInt(limit, 10);
      const pageValue = parseInt(page, 10);

      if (isNaN(limitValue) || limitValue < -1) {
        return res.status(400).json({ error: "O valor de 'limit' é inválido" });
      }
      if (isNaN(pageValue) || pageValue < 1) {
        return res.status(400).json({ error: "O valor de 'page' é inválido" });
      }

      const filters = {};
      if (use_in_menu !== undefined) {
        filters.use_in_menu = use_in_menu === "true";
      }

      const categories = await categoryService.searchCategories(
        filters,
        limitValue,
        pageValue,
        fields
      );

      res.status(200).json({
        categories,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = CategoryController;

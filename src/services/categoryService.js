const Category = require("../models/Category");

class CategoryService {
  static async createCategory(name, slug, use_in_menu) {
    try {
      const data = {
        name,
        slug,
        use_in_menu,
      };

      const newCategory = new Category(data);
      await newCategory.save();
      return newCategory;
    } catch (error) {
      throw new Error("Erro ao criar categoria: " + error.message);
    }
  }

  static async getById(idCategory) {
    try {
      const category = await Category.findByPk(idCategory);

      if (!category) {
        throw new Error("Categoria não encontrado");
      }

      const { id, name, slug, use_in_menu } = category.dataValues;
      return {
        id,
        name,
        slug,
        use_in_menu,
      };
    } catch (error) {
      throw new Error("Erro ao buscar categoria: " + error.message);
    }
  }

  static async update(id, data) {
    try {
      const [updatedCount] = await Category.update(data, {
        where: {
          id: id,
        },
      });

      return Category;
    } catch (error) {
      throw new Error("Erro ao atualizar CATEGORIA: " + error.message);
    }
  }

  static async excluir(id) {
    try {
      const category = await Category.destroy({ where: { id: id } });
      return category;
    } catch (error) {
      throw new Error("Erro ao excluir categoria: " + error.message);
    }
  }

  static async searchCategories(filters, limit, page, fields) {
    try {
      const whereConditions = { ...filters };

      const attributes = fields
        ? fields.split(",")
        : ["id", "name", "slug", "use_in_menu"];

      let pagination = {};
      if (limit !== -1) {
        pagination = {
          limit: limit,
          offset: (page - 1) * limit,
        };
      }

      console.log("Parâmetros da consulta:", {
        whereConditions,
        attributes,
        pagination,
      });

      const categories = await Category.findAndCountAll({
        where: whereConditions,
        attributes: attributes,
        ...pagination,
      });

      console.log("Resultado da consulta:", categories);

      return {
        data: categories.rows,
        total: categories.count,
      };
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      throw new Error("Erro ao buscar categorias: " + error.message);
    }
  }
}

module.exports = CategoryService;

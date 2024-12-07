const { Op } = require("sequelize");
const { Product } = require("../models");
const Image = require("../models/Image");
const OptionProduct = require("../models/OptionProduct");
const Category = require("../models/Category");

class ProdutoService {
  static produtos = [];
  static listar() {
    return this.produtos;
  }
  static consultarPorId(id) {
    // try{
    // }
  }

  static async criar({
    enabled,
    name,
    slug,
    stock,
    description,
    price,
    price_with_discount,
    category_ids,
    images,
    options,
  }) {
    try {
      // Criação do produto
      const produto = await Product.create({
        enabled,
        name,
        slug,
        stock,
        description,
        price,
        price_with_discount,
      });

      // Criação das categorias do produto
      if (category_ids && category_ids.length > 0) {
        for (const category_id of category_ids) {
          await ProductCategory.create({
            product_id: produto.id,
            category_id,
          });
        }
      }

      // Criação das imagens do produto
      if (images && images.length > 0) {
        for (const image of images) {
          await Image.create({
            product_id: produto.id,
            enabled: image.enabled || true,
            path: image.content, // Aqui você vai precisar armazenar o conteúdo da imagem corretamente
          });
        }
      }

      // Criação das opções do produto
      if (options && options.length > 0) {
        for (const option of options) {
          await OptionProduct.create({
            product_id: produto.id,
            title: option.title,
            shape: option.shape,
            radius: option.radius,
            type: option.type,
            values: JSON.stringify(option.value || option.values), // Armazenar como string JSON para valores múltiplos
          });
        }
      }

      // Retorna o produto criado
      return produto;
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      throw error;
    }
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

  static async searchProducts({
    limit = 12,
    page = 1,
    fields = "name,images,price",
    match = "",
    category_ids = "",
    price_range = "",
    option = {},
  }) {
    const limitParsed = limit === "-1" ? -1 : parseInt(limit);
    const pageParsed = parseInt(page);

    const selectedFields = fields.split(",").map((field) => field.trim());

    const categoryIds = category_ids ? category_ids.split(",").map(Number) : [];

    let priceRange = {};
    if (price_range) {
      const [minPrice, maxPrice] = price_range.split("-").map(Number);
      priceRange = { [Op.between]: [minPrice, maxPrice] };
    }

    const filters = {
      name: { [Op.like]: `%${match}%` },
    };

    if (categoryIds.length > 0) {
      filters["$categories.id$"] = { [Op.in]: categoryIds };
    }

    if (Object.keys(option).length > 0) {
      for (const [optionId, values] of Object.entries(option)) {
        filters[`$options.${optionId}$`] = { [Op.in]: values.split(",") };
      }
    }

    if (priceRange) {
      filters.price = priceRange;
    }

    const queryOptions = {
      where: filters,
      limit: limitParsed === -1 ? undefined : limitParsed,
      offset: limitParsed === -1 ? 0 : (pageParsed - 1) * limitParsed,
      attributes: selectedFields,
      include: [
        {
          model: Image,
          as: "images",
          attributes: ["id", "content"],
        },
        {
          model: OptionProduct,
          as: "options",
          attributes: ["id", "title", "values"],
        },
        {
          model: Category,
          as: "categories",
          attributes: ["id", "name", "slug"],
        },
      ],
      distinct: true,
    };

    const { rows, count } = await Product.findAndCountAll(queryOptions);

    const totalPages = limitParsed === -1 ? 1 : Math.ceil(count / limitParsed);

    return {
      data: rows,
      total: count,
      limit: limitParsed === -1 ? count : limitParsed,
      page: pageParsed,
      total_pages: totalPages,
    };
  }
}
module.exports = ProdutoService;

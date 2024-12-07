const Product = require("./Product");
const Image = require("./Image");
const OptionProduct = require("./OptionProduct");
const Category = require("./Category");
const ProductCategory = require("./ProductCategory");

Image.belongsTo(Product, { foreignKey: "ProductId" });
OptionProduct.belongsTo(Product, { foreignKey: "product_id" });

Product.hasMany(Image, { foreignKey: "product_id" });
Product.hasMany(OptionProduct, { foreignKey: "product_id" });
Product.hasMany(ProductCategory, { foreignKey: "product_id" });
Category.hasMany(ProductCategory, { foreignKey: "product_id" });

module.exports = {
  Image,
  OptionProduct,
  Category,
  Product,
  ProductCategory,
};

const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/connection");
const Product = require("./Product");
const Category = require("./Category");

class ProductCategory extends Model {}

ProductCategory.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ProductCategory",
    tableName: "product_category",
    timestamps: false,
  }
);

Product.belongsToMany(Category, {
  through: ProductCategory,
  foreignKey: "product_id",
});
Category.belongsToMany(Product, {
  through: ProductCategory,
  foreignKey: "category_id",
});

module.exports = ProductCategory;

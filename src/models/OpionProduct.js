const { DataTypes, Model } = require("sequelize");
const connection = require("../config/connection");
const Product = require("./Product"); // Importando o modelo Product

class OptionProduct extends Model {}

OptionProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shape: {
      type: DataTypes.ENUM,
      values: ["square", "circle"],
      defaultValue: "square",
      allowNull: true,
    },
    radius: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: ["text", "color"],
      defaultValue: "text",
      allowNull: true,
    },
    values: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "OptionProduct",
    tableName: "option_product",
    timestamps: true,
  }
);

module.exports = OptionProduct;

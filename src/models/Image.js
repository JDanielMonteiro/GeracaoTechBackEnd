const { DataTypes, Model } = require("sequelize");
const connection = require("../config/connection");
const Product = require("./Product");
class Image extends Model {}

Image.init(
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
        model: Product, // Relacionando à tabela de produtos
        key: "id", // Chave primária da tabela de produtos
      },
      allowNull: false,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "Image",
    tableName: "image",
    timestamps: true, // Adiciona automaticamente created_at e updated_at
  }
);

module.exports = Image;

const connection = require("../config/connection");
const User = require("../models/User");
const Image = require("../models/Image");
const Product = require("../models/Product");
const Category = require("../models/Category");
const ProductCategory = require("../models/ProductCategory");

async function syncDatabase() {
  try {
    await connection.sync({ force: true });
    console.log("Banco de dados sincronizado.");
  } catch (error) {
    console.error("Erro ao sincronizar o banco de dados:", error);
  }
}

syncDatabase();

const { Sequelize } = require("sequelize");

// Configuração da conexão com o banco de dados
const connection = new Sequelize(
  "geracao_tech",
  "root",
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
  }
);

module.exports = connection;

const { DataTypes, Model } = require("sequelize");
const connection = require("../config/connection");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        // Criptografa a senha antes de armazená-la no banco
        const hashedPassword = bcrypt.hashSync(value, 10); // '10' é o número de saltos
        this.setDataValue("password", hashedPassword); // Armazena o hash no banco de dados
      },
    },
  },
  {
    sequelize: connection,
    modelName: "User",
    tableName: "user",
    timestamps: true, // Adiciona automaticamente created_at e updated_at
  }
);

module.exports = User;

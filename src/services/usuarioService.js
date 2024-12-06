const User = require("../models/user");

class UserService {
  static async getUserByEmail(userEmail) {
    const user = await User.findOne({ where: { email: userEmail } });

    return user;
  }

  static async getUserById(userId) {
    try {
      const user = await User.findByPk(userId);

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const { id, firstname, surname, email } = user.dataValues;
      return {
        id,
        firstname,
        surname,
        email,
      };
    } catch (error) {
      throw new Error("Erro ao buscar usuário: " + error.message);
    }
  }

  static async createUser(
    firstname,
    surname,
    email,
    password,
    confirmPassword
  ) {
    try {
      const data = {
        firstname,
        surname,
        email,
        password,
        confirmPassword,
      };

      const newUser = new User(data);
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error("Erro ao criar usuário: " + error.message);
    }
  }

  static async updateUser(userId, data) {
    try {
      await user.update(data);

      return user;
    } catch (error) {
      throw new Error("Erro ao atualizar usuário: " + error.message);
    }
  }

  static async excluir(id) {
    try {
      const user = await User.destroy({ where: { id: id } });
      return user;
    } catch (error) {
      throw new Error("Erro ao excluir usuário: " + error.message);
    }
  }
}

module.exports = UserService;

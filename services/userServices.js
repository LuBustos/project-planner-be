const db = require("../models");
const bcrypt = require("bcryptjs");
const User = db.user;

class UserService {
  static async getAllUsers() {
    try {
      const users = User.findAll({
        where: { active: true },
      });

      return users;
    } catch (error) {
      return { error: error.name, message: error.message, success: false };
    }
  }

  static async getUserById(id) {
    try {
      const user = await User.findOne({
        where: { id: id },
      });

      if (!user) {
        return {
          message: "Ops, the user doesnt exist, weird :S, you will be log out",
          success: false,
          data: null,
        };
      }

      return { message: "Found it", success: true, data: user };
    } catch (error) {
      throw error;
    }
  }

  static async hashPassword(password) {
    return await bcrypt.hash(password, 4);
  }

  static async comparePassword(password, h_password) {
    return await bcrypt.compare(password, h_password);
  }

  static async createUser(user) {
    try {
      if (!user.password) {
        return { message: "password not provided", success: false };
      }

      if (!user.username) {
        return { message: "username not provided", success: false };
      }

      //Encriptar password
      const passwordHashed = await this.hashPassword(user.password);

      //Find or create the user
      const [userFound, createdUser] = await User.findOrCreate({
        where: { username: user.username },
        defaults: { ...user, password: passwordHashed },
      });

      //There weren't a user with this username, so it was created
      if (createdUser) {
        return { message: "The user has been created", success: false };
      }

      //We found an user
      if (userFound) {
        return { message: "User found with this username", success: false };
      }

      return {
        message: "Ops! that's embarrasing, there is a bug :p",
        success: false,
      };
    } catch (error) {
      throw error;
    }
  }

  static async login(username, password) {
    try {
      const user = await User.findOne({
        where: { username: username },
      });

      if (!user) {
        return { message: "User not found", success: false, token: "" };
      }

      //check passwords
      const isEqual = await this.comparePassword(password, user.password);

      if (isEqual) {
        return {
          message: "User logged in",
          success: true,
          token: "",
          id: user.id,
        };
      }

      return { message: "invalid credentials", success: false, token: "" };
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(user, id) {
    try {
      //Encriptar password

      const userUpdated = await User.update(user, {
        id: id,
      });

      if (userUpdated) {
        return { message: "The user has been updated", success: true };
      }

      return {
        message: "Ops! that's embarrasing, there is a bug :p",
        success: false,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;

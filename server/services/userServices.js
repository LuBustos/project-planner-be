const { Op } = require("sequelize");
const db = require("../models");
const bcrypt = require("bcryptjs");
const User = db.user;

class UserService {
  static async getAllUsers() {
    try {
      const users = User.findAll({
        where: { active: true, username: {[Op.not]: 'guest'} },
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

      //Hash password
      const passwordHashed = await this.hashPassword(user.password);

      //Find or create the user
      const [userFound, createdUser] = await User.findOrCreate({
        where: { username: user.username },
        defaults: { ...user, password: passwordHashed, active: true },
      });

      //There weren't a user with this username, so it was created
      if (createdUser) {
        return {
          message: "The user has been created",
          success: true,
          data: userFound.id,
        };
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

      if (user.username === "guest") {
        return {
          message: "User logged in as guest",
          success: true,
          token: "",
          id: null,
        };
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
      const { username, password } = user;

      if (username.length === 0 || password.length === 0) {
        return {
          message: "Username or password empty",
          success: false,
        };
      }

      if (password.length < 4) {
        return {
          message: "password too short",
          success: false,
        };
      }

      const userFound = await User.findOne({
        where: { id: id },
      });

      if (!userFound) {
        return {
          message: "Ops! that's embarrasing, you don't have an id D:, that's weird",
          success: false,
        };
      }

      const data = {
        username: username,
        password: password,
      };

      const isEqual = this.comparePassword(data.password,userFound.password);

      if(isEqual){
        delete data.password;
      }else{
        data.password = this.hashPassword(data.password);
      }

      const userUpdated = await User.update(
        { ...data },
        {
          where: { id: id },
        }
      );

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

  static async updateAvatar(user, id) {
    try {
      const data = {
        avatar: user.uri,
      };

      const userUpdated = await User.update(
        { ...data },
        {
          where: { id: id },
        }
      );

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

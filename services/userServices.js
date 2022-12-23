const db = require("../models");
// const NsCategory = db.ns_category;
const User = db.user;

class UserService {
  static async getAllUsers() {
    try {
      //Desencriptar password
    } catch (error) {
      return { error: error.name, message: error.message };
    }
  }

  static async createUser(user) {
    try {
      //Encriptar password
        console.log(User,user)
      const userCreated = await User.create({...user});

      if (userCreated) {
        return true;
      }

      return false;
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
        return true;
      }

      return false;
    } catch (error) {
      return { error: error.name, message: error.message };
    }
  }
}

module.exports = UserService;

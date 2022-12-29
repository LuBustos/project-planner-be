const UserService = require("../services/userServices");

class UserController {
  static async list(req, res) {
    try {
      const response = await UserService.getAllUsers();
      const users = response.map((u) => {
        return u.renderUserList();
      });
      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        error_code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }
  }

  static async getProfile(req, res) {
    try {
      const { id } = req.query;
      const response = await UserService.getUserById(id);
      if (response.success) {
        return res.status(200).json({
          success: true,
          message: response.message,
          data: response.data,
        });
      } else {
        return res.status(404).json({
          sucess: false,
          message: response.message,
          data: response.data,
        });
      }
    } catch (error) {
      return res.status(500).send({
        success: false,
        error_code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }
  }

  static async create(req, res) {
    try {
      const { password } = req.body;

      if (password.length < 4) {
        return res
          .status(404)
          .send({ message: "password too short", success: false });
      }

      const response = await UserService.createUser(req.body);
      if (response.success) {
        return res.status(200).json({
          success: true,
          message: response.message,
          data: response.data,
        });
      } else {
        return res
          .status(404)
          .send({ message: response.message, success: false });
      }
    } catch (error) {
      return res.status(500).send({
        success: false,
        error_code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }
  }

  static async updateAvatar(req, res) {
    try {
      const { id } = req.query;
      const response = await UserService.updateAvatar(req.body.form, id);
      if (response.success) {
        return res.status(200).json({
          success: true,
          message: response.message,
        });
      } else {
        return res.status(404).json({
          sucess: false,
          message: response.message,
        });
      }
    } catch (error) {
      return res.status(500).send({
        success: false,
        error_code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.query;
      const response = await UserService.updateUser(req.body, id);
      if (response.success) {
        return res.status(200).json({
          success: true,
          message: response.message,
        });
      } else {
        return res.status(404).json({
          sucess: false,
          message: response.message,
        });
      }
    } catch (error) {
      return res.status(500).send({
        success: false,
        error_code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }
  }
}

module.exports = UserController;

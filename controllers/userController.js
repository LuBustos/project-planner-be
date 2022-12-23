const UserService = require("../services/userServices");

class UserController {
  static async list(req, res) {
    try {
      const response = await UserService.getAllUsers();
      const users = response.map(u => {
        return u.renderUserList();
      })
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
    // PaymentMethodService.findAll().then(reasons => {
    //   let response = reasons.rows.map(p => { return p.renderForOptions() });
    //   return res.status(200).json({success: true, response});
    // }).catch((e) => {
    //   return res.status(500).send({success: false, error_code: 'INTERNAL_SERVER_ERROR', message: e.message});
    // });
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
        return res.status(500).json({ message: "password too short" });
      }

      const response = await UserService.createUser(req.body);
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

  static async update(req, res) {
    try {
      const { id } = req.params;
      const response = await UserService.updateUser(req.body, id);
      if (response.success) {
        return res.status(200).json({
          success: true,
          message: response.message,
        });
      } else {
        return res.status(404).json({
          //Chequear que este bien que sea 404
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

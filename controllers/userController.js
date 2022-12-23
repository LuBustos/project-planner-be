const UserService = require("../services/userServices");

class UserController {
  static async list(req, res) {
    try {
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

  static async create(req, res) {
    try {
      const response = await UserService.createUser(req.body);
      if (response) {
        return res.status(200).json({
          success: true,
          response,
        });
      } else {
        return res.status(404).json({
          sucess: false,
          response,
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
      if (response) {
        return res.status(200).json({
          success: true,
          response,
        });
      } else {
        return res.status(404).json({
          //Chequear que este bien que sea 404
          sucess: false,
          response,
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

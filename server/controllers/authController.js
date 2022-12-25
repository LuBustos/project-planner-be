const UserService = require("../services/userServices");

class AuthController {
  
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const response = await UserService.login(username, password);
      
        console.log(response.message)

      if (response.success) {
        return res.status(200).json({
          success: true,
          message: response.message,
          token: response.token,
          id: response.id
        });
      } else {
        return res.status(404).json({
          sucess: false,
          message: response.message,
          token: response.token,
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

module.exports = AuthController;

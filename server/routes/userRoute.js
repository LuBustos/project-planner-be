const UserController = require('../controllers/userController');
const AuthController = require('../controllers/authController');

const express = require('express');
const router = express.Router();

// const { authenticate } = require('../middleware/authenticate');

router.get('/user/list',UserController.list); //Con authenticate
router.post('/user',UserController.create);
router.put('/update-avatar',UserController.updateAvatar); //Con authenticate
router.put('/update-user',UserController.updateUser); //Con authenticate
router.get('/profile',UserController.getProfile); //Con authenticate



router.post('/login',AuthController.login);

module.exports = router;
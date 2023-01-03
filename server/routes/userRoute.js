const UserController = require('../controllers/userController');
const AuthController = require('../controllers/authController');

const express = require('express');
const router = express.Router();

router.get('/user/list',UserController.list);
router.post('/user',UserController.create);
router.put('/update-avatar',UserController.updateAvatar);
router.put('/update-user',UserController.updateUser); 
router.get('/profile',UserController.getProfile); 



router.post('/login',AuthController.login);

module.exports = router;
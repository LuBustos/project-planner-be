const UserController = require('../controllers/userController');

const express = require('express');
const router = express.Router();

// const { authenticate } = require('../middleware/authenticate');

router.get('/user/list',UserController.list); //Con authenticate
router.post('/user',UserController.create);
router.put('/user/:id',UserController.update); //Con authenticate

module.exports = router;
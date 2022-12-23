const TaskController = require('../controllers/taskController');

const express = require('express');
const router = express.Router();

// const { authenticate } = require('../middleware/authenticate');

router.get('/task/list', TaskController.list);
router.post('/task', TaskController.createTask);
// router.put('/task/:id', () => {});
router.get('/show-task', TaskController.getTaskById);

module.exports = router;
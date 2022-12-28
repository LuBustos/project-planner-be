const TaskController = require('../controllers/taskController');

const express = require('express');
const router = express.Router();

// const { authenticate } = require('../middleware/authenticate');

router.post('/task/list', TaskController.list);
router.post('/task', TaskController.createTask);
router.put('/update-task', TaskController.updateTask);
router.get('/show-task', TaskController.getTaskById);
router.put('/update-task-status', TaskController.updateTaskStatus)

module.exports = router;
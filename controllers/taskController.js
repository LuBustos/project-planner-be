const TaskService = require("../services/taskService");

class TaskController {
  static async list(req, res) {
    try {
      const { id } = req.query;
      const response = await TaskService.listTask(id);
      const tasks = response.data.map(t => {
        return t.renderTaskList();
      })
      return res.status(200).json({ success: true, data: tasks });
    } catch (error) {
      return res.status(500).send({
        success: false,
        error_code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }
  }

  static async createTask(req, res) {
    try {
      const response = await TaskService.create(req.body);
      return res.status(200).json({ success: true, response });
    } catch (error) {
      return res.status(500).send({
        success: false,
        error_code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }
  }

  static async getTaskById(req, res) {
    try {
      const { id } = req.query;
      const response = await TaskService.getTaskById(id);
      const task = response.data.renderOneTask();
      return res.status(200).json({ success: true, data: task });
    } catch (error) {
      return res.status(500).send({
        success: false,
        error_code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }
  }

  static async updateTask(req, res) {}

  static async removeTask(req, res) {}
}

module.exports = TaskController;

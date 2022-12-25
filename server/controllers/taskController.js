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
      if(response.success){
        return res.status(200).json({ success: true, response });
      }else{
        return res.status(404).json({ success: true, message: response.message });
      }
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

  static async updateTask(req, res) {
    try {
      const {id} = req.query
      const response = await TaskService.update(id,req.body);
      return res.status(200).json({ success: response.success, message: response.message });
    } catch (error) {
      console.log("ERROR",error)
      return res.status(500).send({
        success: false,
        error_code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }
  }

  static async updateTaskStatus(req, res) {
    try {
      const { id,status } = req.body;
      const response = await TaskService.changeTaskStatusById(id,status);
      return res.status(200).json({ success: response.success, message: response.message });
    } catch (error) {
      return res.status(500).send({
        success: false,
        error_code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }
  }
}

module.exports = TaskController;

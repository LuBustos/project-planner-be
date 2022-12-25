const { Op } = require("sequelize");
const { task } = require("../models");
const db = require("../models");
const Task = db.task;
const User = db.user;

const REMOVED = 3;
const COMPLETED = 2;

class TaskService {
  static async create(task) {
    try {
      const { to, title } = task; //Una tarea donde se seleccionaron los usuarios + owner

      if (title.length < 2 || title.length > 20) {
        return {
          success: false,
          message: "Title too short or too long",
        };
      }

      if (to.length === 0) {
        return {
          success: false,
          message: "There are no users related with this task",
        };
      }

      const task_created = await Task.create(
        { ...task },
        {
          individualHooks: true,
        }
      );

      //Users Array
      if (to) {
        for (const user_id of to) {
          const user = await User.findOne({
            where: { id: user_id },
          });
          await user.addTask(task_created, { through: {} });
        }
      }

      return {
        success: true,
        message: "The task has been created",
      };
    } catch (error) {
      throw error;
    }
  }

  static async update(id, body) {
    try {
      const { to, title } = body;

      if (title.length < 2 || title.length > 20) {
        return {
          success: false,
          message: "Title too short or too long",
        };
      }

      if (to.length === 0) {
        return {
          success: false,
          message: "There are no users related with this task",
        };
      }

      const taskFound = await Task.findOne({
        where: { id: id },
      });

      if (!taskFound) {
        return {
          success: false,
          message: "Ops, is this a bug?, try again",
        };
      }

      //Find users related with this task
      const userTasks = await User.findAll({
        include: [
          {
            attributes: ["id"],
            model: Task,
            where: {
              id: id,
            },
          },
        ],
      });

      const userIds = userTasks.map((user) => user.id);

      //Users id that we have to remove the relationship with task
      const removedUsers = userIds.filter((task) => !to.includes(task));

      //Users id that we have to add in the relationship with task
      const addUsers = to.filter((task) => !userIds.includes(task));

      //Removed Users Array
      if (removedUsers.length > 0) {
        for (const id of removedUsers) {
          const user = await User.findOne({
            where: { id: id },
          });
          await user.removeTask(taskFound);
        }
      }

      //Add Users Array
      for (const user_id of addUsers) {
        const user = await User.findOne({
          where: { id: user_id },
        });
        await user.addTask(taskFound, { through: {} });
      }

      //Update task
      const task_updated = await Task.update(
        { ...body },
        {
          individualHooks: true,
          where: {
            id: id,
          },
        }
      );

      if (task_updated) {
        return {
          success: true,
          message: "The task has been created",
        };
      }

      return {
        success: false,
        message: "Ops!",
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async listTask(id) {
    try {
      //Falta agregar el filtro para los tipos de tareas?
      //Falta agregar el filtro para los estados
      const tasks = await Task.findAll({
        include: [
          {
            model: User,
            where: {
              id: id,
            },
          },
        ],
        where: {
          status_id: { [Op.not]: REMOVED, [Op.not]: COMPLETED },
        },
      });

      return { success: true, data: tasks };
    } catch (error) {
      throw error;
    }
  }

  static async changeTaskStatusById(id, status) {
    try {
      const taskUpdated = await Task.update(
        {
          status_id: status,
        },
        {
          individualHooks: true,
          where: { id: id },
        }
      );

      if (taskUpdated) {
        return { success: true, message: "Task Updated" };
      }

      return { success: false, message: "Ops" };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getTaskById(id) {
    try {
      const task = await Task.findOne({
        include: User,
        where: { id: id },
      });

      return { success: true, data: task };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TaskService;

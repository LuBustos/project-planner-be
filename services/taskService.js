const db = require("../models");
const Task = db.task;
const User = db.user;

class TaskService {
  static async create(task) {
    try {
      const { assigness, owner } = task; //Una tarea donde se seleccionaron los usuarios + owner

      const task_created = await Task.create({ ...task });

      //Array de usuarios encargados x id
      if (assigness) {
        for (const assign of assigness) {
          const user = await User.findOne({
            where: { id: assign.id },
          });
          await user.addTask(task_created, { through: {} });
        }
      }

      //Creador de la tarea, autoseleccionandose
      if (owner) {
        const user = await User.findOne({
          where: { id: owner.id },
        });
        await user.addTask(task_created, { through: {} });
      }

      return {
        success: true,
        message: "The task has been created",
      };
    } catch (error) {
      throw error;
    }
  }

  static async update() {}

  static async remove() {}

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
      });

      return { success: true, data: tasks };
    } catch (error) {
      throw error;
    }
  }

  static async getTaskById(id) {
    try {
      const task = await Task.findOne({
        include: User,
        where: { id: id },
      });

      return {success: true, data: task}
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TaskService;

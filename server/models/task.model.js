const moment = require("moment");

const STATUS = {
  STARTED: 1,
  COMPLETED: 2,
  REMOVED: 3,
  EXPIRED: 4,
};

module.exports = function (sequelize, DataTypes) {
  const Task = sequelize.define(
    "task",
    {
      id: {
        type: DataTypes.INTEGER().UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      status_id: {
        type: DataTypes.INTEGER().UNSIGNED,
        allowNull: true,
      },
      tags: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "task",
      timestamps: false,
      hooks: {
        beforeCreate: async function (instance, options) {
          instance.status_id = STATUS.STARTED;
        },
      },
    }
  );

  Task.prototype.renderTaskList = function () {
    const dueDate = moment(this.dueDate);
    const today = moment();
    let overdate = false;
    if (today > dueDate) {
      overdate = true;
    }

    return {
      id: this.id,
      title: this.title,
      overdate: overdate,
    };
  };

  Task.prototype.renderOneTask = function () {
    //Try to refactor?
    let formatDate = null;
    if (this.dueDate != null) {
      const date = this.dueDate;
      formatDate =
        date.getDate() +
        "-" +
        parseInt(date.getMonth() + 1) +
        "-" +
        date.getFullYear();
    }

    return {
      id: this.id,
      title: this.title,
      image: this.image,
      tags: this.tags,
      description: this.description,
      users: this.users.map((user) => user.id),
      dueDate: formatDate,
    };
  };

  return Task;
};

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
      // user_id: {
      //   type: DataTypes.INTEGER().UNSIGNED,
      //   allowNull: true,
      // },
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
      //   tags_id: { //no es una clase por ahora.. sino datos randoms que podes agregar vos?
      //     type: DataTypes.INTEGER().UNSIGNED,
      //     allowNull: true,
      //   },
      tags: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      created_by:{
        type: DataTypes.INTEGER,
        allowNull: false,
      }
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
    return {
      id: this.id,
      title: this.title,
    };
  };

  Task.prototype.renderOneTask = function () {
    return {
      id: this.id,
      title: this.title,
      image: this.image,
      tags: this.tags,
      description: this.description,
      users: this.users.map((user) => user.id),
    };
  };

  return Task;
};

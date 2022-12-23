module.exports = function (sequelize, DataTypes) {
  const User_Task = sequelize.define(
    "user_task",
    {
      taskId: {
        type: DataTypes.INTEGER().UNSIGNED,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER().UNSIGNED,
        allowNull: false,
      },
    }, //composite key
    {
      tableName: "user_task",
      timestamps: false,
    }
  );

  return User_Task;
};

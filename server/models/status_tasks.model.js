module.exports = function (sequelize, DataTypes) {
  const StatusTask = sequelize.define(
    "status_tasks",
    {
      id: {
        type: DataTypes.INTEGER().UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: "status_tasks",
      timestamps: false
    }
  );

  return StatusTask;
};

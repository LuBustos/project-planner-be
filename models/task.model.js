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
      user_id: {
        type: DataTypes.INTEGER().UNSIGNED,
        allowNull: true,
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
      //   tags_id: { //no es una clase por ahora.. sino datos randoms que podes agregar vos?
      //     type: DataTypes.INTEGER().UNSIGNED,
      //     allowNull: true,
      //   },
      tags: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      tableName: "task",
      timestamps: false
    }
  );

  return Task;
};

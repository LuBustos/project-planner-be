module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "user_task",
      {
        taskId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
      },
      {
        freezeTableName: true,
        timestamps: false,
      }
    );
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("user_task");
  },
};

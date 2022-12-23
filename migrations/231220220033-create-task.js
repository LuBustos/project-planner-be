module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "task",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        // user_id: {
        //   allowNull: true,
        //   type: Sequelize.INTEGER,
        // },
        title: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        image: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        status_id: {
          allowNull: true,
          type: Sequelize.INTEGER,
        },
        tags: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      },
      {
        freezeTableName: true,
        timestamps: false,
      }
    );
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("task");
  },
};

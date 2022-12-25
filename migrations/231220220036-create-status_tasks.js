module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable(
        "status_tasks",
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          description: {
            type: Sequelize.STRING(100),
            allowNull: false,
          },
          active: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          },
        },
        {
          freezeTableName: true,
          timestamps: false,
        }
      );
    },
    down: (queryInterface) => {
      return queryInterface.dropTable("status_tasks");
    },
  };
  
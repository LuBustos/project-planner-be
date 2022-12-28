module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "user",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        // task_id: {
        //   type: Sequelize.INTEGER,
        //   allowNull: true,
        // },
        username: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        avatar: {
          type: Sequelize.STRING(255),
          allowNull: true,
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
    return queryInterface.dropTable("user");
  },
};

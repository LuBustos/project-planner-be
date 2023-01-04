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
        username: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(150),
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

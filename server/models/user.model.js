module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER().UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING(255),
        allowNull: null,
      },
      active: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      tableName: "user",
      timestamps: false
    }
  );

  User.prototype.renderUserList = function () {
    return {
      id: this.id,
      label: this.username,
      value: this.id,
      avatar: this.avatar
    }
  }

  return User;
};

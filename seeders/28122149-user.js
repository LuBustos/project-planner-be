"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "user",
      [
        {
          username: "guest",
          password: "guest",
          avatar: null,
          active: true
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("user", null, {});
  },
};

"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "status_tasks",
      [
        {
          description: "STARTED",
          active: true,
        },
        {
          description: "COMPLETED",
          active: true,
        },
        {
          description: "REMOVED",
          active: true,
        },
        {
          description: "EXPIRED",
          active: true,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("status_tasks", null, {});
  },
};

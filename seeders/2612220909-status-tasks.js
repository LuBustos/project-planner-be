"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "status_tasks",
      [
        {
          task_id: null,
          description: "STARTED",
          active: true,
        },
        {
          task_id: null,
          description: "COMPLETED",
          active: true,
        },
        {
          task_id: null,
          description: "REMOVED",
          active: true,
        },
        {
          task_id: null,
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

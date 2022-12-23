const dbConfig = require("../config/db.config");
require("dotenv").config();
//Configuration
const { Sequelize, Op } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: dbConfig.dialect,
    port: process.env.DB_PORT || 3306,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const db = {};
db.op = Op;
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Call models
db.user = require("./user.model")(sequelize, Sequelize);
db.task = require("./task.model")(sequelize, Sequelize);
db.status_task = require("./status_tasks.model")(sequelize, Sequelize);

//A.hasMany(B)  FK B PK A
//A.belongsTo(B)  FK A PK B


db.user.hasMany(db.task, {
  as: "user_task",
  foreignKey: "user_id",
  targetKey: "id",
});

db.task.hasMany(db.user, {
  as: "task_for_users",
  foreignKey: "task_id",
  targetKey: "id",
})

db.task.belongsTo(db.status_task, {
  as: 'status',
  foreignKey: 'status_id',
  targetKey: 'id'
})

module.exports = db;

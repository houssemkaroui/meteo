const Config = require("../config/config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(Config.DB, Config.USER, Config.PASSWORD, {
  host: Config.HOST,
  dialect: Config.dialect,

  pool: {
    max: Config.pool.max,
    min: Config.pool.min,
    acquire: Config.pool.acquire,
    idle: Config.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.meteos = require("./meteo.model.js")(sequelize, Sequelize);

module.exports = db;

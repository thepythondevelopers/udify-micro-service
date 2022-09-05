const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
require('dotenv').config();
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: process.env.DATABASE_PORT
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.js")(sequelize, Sequelize);
db.account = require("./accounts.js")(sequelize, Sequelize);
db.userToken = require("./userToken.js")(sequelize, Sequelize);
db.knowledgebase = require("./knowledgebase.js")(sequelize, Sequelize);


db.user.hasOne(db.account,{ foreignKey: 'public_id', sourceKey: 'guid'});


module.exports = db;
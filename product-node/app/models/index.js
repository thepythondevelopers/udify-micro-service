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

db.userToken = require("./userToken.js")(sequelize, Sequelize);
db.product = require("./products.js")(sequelize, Sequelize);
db.productCustomData = require("./products_custom_data.js")(sequelize, Sequelize);
db.productVariant = require("./product_variants.js")(sequelize, Sequelize);
db.account = require("./accounts.js")(sequelize, Sequelize);

db.integration = require("./integration.js")(sequelize, Sequelize);
db.user = require("./user.js")(sequelize, Sequelize);

db.product.hasMany(db.productVariant,{ foreignKey: 'product_id', sourceKey: 'id'});
db.user.hasOne(db.account,{ foreignKey: 'public_id', sourceKey: 'guid'});

module.exports = db;
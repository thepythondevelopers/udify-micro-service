require('dotenv').config();

module.exports = {
    HOST: process.env.DATABASE_HOST,
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWORD,
    DB: process.env.HOST_DATABASE_NAME,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 90000,
      idle: 10000
    }
  };
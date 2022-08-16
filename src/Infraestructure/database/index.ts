const { Sequelize } = require("sequelize");
const ENV = require("../../config/environments");

export const sequelize = new Sequelize(ENV.DB_STRING_CONECTION, {
  dialectOptions: {
    /*
    ssl: {
      require: false,
      rejectUnauthorized: false,
    },*/
  },
});

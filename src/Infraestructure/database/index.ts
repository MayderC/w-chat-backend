const { Sequelize } = require("sequelize");
import ENV from "../../config/environments";

export const sequelize = new Sequelize(ENV.DB_STRING_CONECTION, {
  dialectOptions: {
    /*
    ssl: {
      require: false,
      rejectUnauthorized: false,
    },*/
  },
});

const { Sequelize } = require("sequelize");
const ENV = require("../../config/environments");

export default  new Sequelize(ENV.DB_STRING_CONECTION, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});


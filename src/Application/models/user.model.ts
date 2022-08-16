import { sequelize } from "../../Infraestructure/database/index";
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
});

module.exports = { User };

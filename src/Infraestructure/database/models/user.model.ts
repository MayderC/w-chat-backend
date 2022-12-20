import { sequelize } from "../index";
const { DataTypes } = require("sequelize");

export const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
});

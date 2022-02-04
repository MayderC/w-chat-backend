const { sequelize } = require("../database");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id_user: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
});

module.exports = { User };

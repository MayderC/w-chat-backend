const { sequelize } = require("../database");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {

  id: {
    primaryKey : true,
    type : DataTypes.UUID,
    autoIncrement : false
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

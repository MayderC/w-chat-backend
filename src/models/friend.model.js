const { sequelize } = require("../database");
const { DataTypes } = require("sequelize");
const { User } = require("./user.model");

const Friend = sequelize.define("friend", {
  friend_a: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: User,
      key: "id_user",
    },
  },
  friend_b: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: User,
      key: "id_user",
    },
  },
});

module.exports = { Friend };

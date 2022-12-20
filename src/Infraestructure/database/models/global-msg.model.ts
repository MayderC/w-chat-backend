import { sequelize } from "../index";
const { DataTypes } = require("sequelize");
const { User } = require("./user.model");

export const GlobalMsg = sequelize.define("global_message", {
  uid: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    references: {
      model: User,
      key: "id",
    },
  },

  date: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },

  msg: {
    type: DataTypes.TEXT,
  },
});

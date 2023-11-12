const { sequelize } = require("../database");
const { DataTypes } = require("sequelize");
const { User } = require("./user.model");

const Message = sequelize.define("message", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  user_received: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    references: {
      model: User,
      key: "id_user",
    },
  },

  user_trasmitter: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    references: {
      model: User,
      key: "id_user",
    },
  },

  messages: {
    type: DataTypes.TEXT,
  },

  date: {
    type: DataTypes.DATE,
  },
});

//module.exports = { Message };

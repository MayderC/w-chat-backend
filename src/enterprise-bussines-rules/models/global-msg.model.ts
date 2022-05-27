import  sequelize  from '../../frameworks-drivers/database'
const { DataTypes } = require("sequelize");
const { User } = require("./user.model");

const GlobalMsg = sequelize.define("global_message", {
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

module.exports = { GlobalMsg };

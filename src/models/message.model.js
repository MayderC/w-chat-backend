const {sequelize} = require('../database')
const {DataTypes} = require('sequelize')


const Message = sequelize.define('Message',{

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  date_read: {
    type: DataTypes.DATE
  },

  status : {
    type: DataTypes.ENUM("ENVIADO", "LEIDO")
  }

})




module.exports = {Message}
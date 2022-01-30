const {sequelize} = require('../database')
const {DataTypes} = require('sequelize')


const Contact = sequelize.define('Contact',{

  id : {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name : {
    type: DataTypes.STRING,
  }

})


module.exports = {Contact}
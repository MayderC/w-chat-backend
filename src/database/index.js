const { Sequelize } = require('sequelize');
const ENV = require('../config/environments')


const sequelize = new Sequelize(ENV.DB_STRING_CONECTION) 
module.exports = {sequelize}

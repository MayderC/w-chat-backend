const jwt = require('jsonwebtoken')
const ENV = require('../config/environments/')


const createToken = ( payload = {}) => {
  const KEYWORD = ENV.JWT_KEYWORD

  // 1000 milliseconds = 1 second
  const SECOND = 1000

  // 60 seconds = 1 minute
  const MINUTE = 60
  
  // 60 minutes = 1 hour
  const HOUR = 60

  // quantity of hours
  const HOURS = 7

  payload.exp = Math.floor(Date.now() / SECOND) + ( (MINUTE * HOUR) * HOURS )

  return new Promise((resolve,reject) =>{
    jwt.sign( payload, KEYWORD,(err, token) =>{
      if(err) {reject(err)}
      if(token) {resolve(token)}
    });
  })

}


const decodeToken = (token) =>{
  const KEYWORD = process.env.JWT_KEYWORD

  try {
    const payload = jwt.verify(token, KEYWORD)
    return payload
  } catch (error) {
    return false
  }

}



module.exports = {createToken, decodeToken}
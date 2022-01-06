
if(!process.env.NODE_ENV){
  require('dotenv').config()
}

const environments = {
  DEVELOPMENT: require('./development'),
  PRODUCTION: require('./production'),
  QA: require('./qa'),
}

const getEnvironment = (env) => {
  return  (Object.keys(environments).includes(env)) 
  ? environments[env] 
  : environments['DEVELOPMENT']
}

const CURRENT_ENV = getEnvironment(process.env.NODE_ENV)
module.exports = CURRENT_ENV


const jwt = require("jsonwebtoken");
const ENV = require("../config/environments/");

const KEYWORD = ENV.JWT_KEYWORD;

const createToken = (payload = {}) => {
  const SECOND = 1000;
  const MINUTE = 60;
  const HOUR = 60;

  const HOURS = 7;

  // HOURS const, in ms
  payload.exp = Math.floor(Date.now() / SECOND) + MINUTE * HOUR * HOURS;

  return new Promise((resolve, reject) => {
    jwt.sign(payload, KEYWORD, (err, token) => {
      if (err) {
        reject(err);
      }
      if (token) {
        resolve(token);
      }
    });
  });
};

const decodeToken = (token) => {
  try {
    const payload = jwt.verify(token, KEYWORD);
    return payload;
  } catch (error) {
    return false;
  }
};

module.exports = { createToken, decodeToken };

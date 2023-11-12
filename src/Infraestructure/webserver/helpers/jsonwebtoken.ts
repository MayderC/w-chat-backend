const jwt = require("jsonwebtoken");

import ENV from "../../../config/environments";

const KEYWORD = ENV.JWT_KEYWORD;

interface IJwtPayload {
  id: string;
  exp: any;
}

export const createToken = (payload: IJwtPayload) => {
  const SECOND = 1000;
  const MINUTE = 60;
  const HOUR = 60;

  const HOURS = 7;

  // HOURS const, in ms
  payload.exp = Math.floor(Date.now() / SECOND) + MINUTE * HOUR * HOURS;

  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, KEYWORD, (err: any, token: string) => {
      if (err) {
        reject(err);
      }
      if (token) {
        resolve(token);
      }
    });
  });
};

export const decodeToken = (token: string): IJwtPayload => {
  try {
    return jwt.verify(token, KEYWORD);
  } catch (error) {
    return { exp: "", id: "" };
  }
};

const bcrypt = require("bcrypt");

export default class EncryptPassword {
  static encryptPassword(password : any) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  static verifyPassword(passwordRequest : any, userPassword : any) {
    return bcrypt.compareSync(passwordRequest, userPassword);
  }
};

const bcrypt = require("bcrypt");

export default class EncryptPassword {
  static encryptPassword(password : string) : string {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  static verifyPassword(passwordRequest : string, userPassword : string) : boolean {
    return bcrypt.compareSync(passwordRequest, userPassword);
  }
};

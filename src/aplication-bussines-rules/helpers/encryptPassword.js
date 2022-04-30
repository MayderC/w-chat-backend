const bcrypt = require("bcrypt");

module.exports = class EncryptPassword {
  encryptPassword(password) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  verifyPassword(passwordRequest, userPassword) {
    return bcrypt.compareSync(passwordRequest, userPassword);
  }
};

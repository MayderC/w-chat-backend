const { User } = require("../../models/user.model");
const { createToken } = require("../..//helpers/jsonwebtoken");
const bcrypt = require("bcrypt");

class AuthService {
  constructor() {}

  login(username, password) {
    return new Promise((resolve, reject) => {});
  }

  register(username, password) {
    return new Promise((resolve, reject) => {
      const passHashed = this.encryptPassword(password);
      const userSaved = User.create({ username, email, password: passHashed });
      createToken({ id: userSaved.id }).then(resolve).catch(reject(false));
    });
  }

  encryptPassword(password) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  updatePassword() {}

  requestNewPassword() {}
}

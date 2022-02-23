const { User } = require("../../models/user.model");
const { createToken, decodeToken } = require("../..//helpers/jsonwebtoken");
const bcrypt = require("bcrypt");

class AuthService {
  constructor() {}

  async register(username, password) {
    if (!username || !username) return false;

    try {
      const passHashed = this.encryptPassword(password);
      const userSaved = await User.create({
        username: username,
        password: passHashed,
      });
      const token = await createToken({ id: userSaved.id });
      const user = { username: userSaved.username, id: userSaved.id };
      return { token, user };
    } catch (error) {
      return false;
    }
  }

  async getProfile(token) {
    const payload = decodeToken(token);
    if (!payload) return false;

    const user = await User.findByPk(payload.id);
    return user ? { username: user.username, id: user.id } : false;
  }

  async login(username, password) {
    const userFound = await User.findOne({
      where: {
        username: username,
      },
    });
    if (!userFound) return false;
    const token = await createToken({ id: userFound.id });
    const match = bcrypt.compareSync(password, userFound.password);
    const user = { username: userFound.username, id: userFound.id };
    return match ? { token, user } : false;
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

module.exports = { AuthService };

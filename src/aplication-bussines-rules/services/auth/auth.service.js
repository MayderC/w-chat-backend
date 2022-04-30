const { User } = require("../../../enterprise-bussines-rules/models/user.model");
const { createToken } = require("../../../interfaces-adapters/helpers/jsonwebtoken");
const bcrypt = require("bcrypt");

class AuthService {
  constructor(encryptPassword, unitOfWork) {
    this._encryptPassword = encryptPassword;
    this._unitOfWork = unitOfWork;
  }

  async register(username, password) {
    if (!username || !password) return {};
    const passHashed = this.encryptPassword(password);
    try {
      const userSaved = await User.create({username: username,password: passHashed,});
      //const saved =  unitOfWork.auth.register({username: password: passHashed})
      const user = { username: userSaved.username, id: userSaved.id };
      return {user};
    } catch (error) {
      return {};
    }
  }

  async getProfile(id) {

    const user = await User.findByPk(id);
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

  updatePassword() {}

  requestNewPassword() {}
}

module.exports = { AuthService };

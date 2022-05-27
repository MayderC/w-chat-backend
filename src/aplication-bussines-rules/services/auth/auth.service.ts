const { User } = require("../../../enterprise-bussines-rules/models/user.model");
import EncryptPassword from '../../helpers/encryptPassword';
const { createToken } = require("../../../interfaces-adapters/helpers/jsonwebtoken");



export default class AuthService {

  _unitOfWork;

  constructor() {
    this._unitOfWork = "";
  }

  async register(username: any, password: any) {
    if (!username || !password) return {};
    const passHashed = EncryptPassword.encryptPassword(password);
    try {
      const userSaved = await User.create({username: username,password: passHashed,});
      //const saved =  unitOfWork.auth.register({username: password: passHashed})
      const user = { username: userSaved.username, id: userSaved.id };
      return {user};
    } catch (error) {
      return {};
    }
  }

  async getProfile(id: any) {

    const user = await User.findByPk(id);
    return user ? { username: user.username, id: user.id } : false;
  }

  async login(username :any, password : any) {
    const userFound = await User.findOne({
      where: {
        username: username,
      },
    });
    if (!userFound) return false;
    const token = await createToken({ id: userFound.id });
    const match = EncryptPassword.verifyPassword(password, userFound.password);
    const user = { username: userFound.username, id: userFound.id };
    return match ? { token, user } : false;
  }

  updatePassword() {}

  requestNewPassword() {}
}



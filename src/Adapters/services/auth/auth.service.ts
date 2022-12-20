import { User } from "../../../Infraestructure/database/models/user.model";
import { EncryptPassword } from "../../helpers/encryptPassword";

interface IUser {
  username: string;
  id: string;
}

export class AuthService {
  _repository;

  constructor() {
    this._repository = "";
  }

  async register(username: string, password: string): Promise<IUser | null> {
    const passHashed = EncryptPassword.encryptPassword(password);
    const userSaved = await User.create({
      username: username,
      password: passHashed,
    });

    const user: IUser = { username: userSaved.username, id: userSaved.id };
    return user;
  }

  async getProfile(id: number): Promise<IUser | null> {
    try {
      const user = await User.findByPk(id);
      return user ? { username: user.username, id: user.id } : null;
    } catch (error) {
      return null;
    }
  }

  async login(username: string, password: string): Promise<IUser | null> {
    const userFound = await User.findOne({ where: { username: username } });
    if (!userFound) return null;

    const match = EncryptPassword.verifyPassword(password, userFound.password);
    if (!match) return null;

    return { username: userFound.username, id: userFound.id };
  }
}

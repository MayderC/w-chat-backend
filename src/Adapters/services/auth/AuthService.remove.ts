import IAuthService from "../../../Application/Ports/services/IAuthService";
import { EncryptPassword } from "../../helpers/encryptPassword";
import { AuthRepository } from "../../repositories/AuthRepository";

interface IUser {
  username: string;
  id: string;
}

export class AuthService {
  private readonly _repository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this._repository = authRepository;
  }

  async register(username: string, password: string): Promise<IUser> {
    const passHashed = EncryptPassword.encryptPassword(password);
    const userSaved = await this._repository.register({ username, password: passHashed });
    return { username: userSaved.username, id: userSaved.id };
  }

  async getProfile(id: string): Promise<IUser> {
    const user = await this._repository.getProfile(id);
    return { username: user.username, id: user.id };
  }

  async login(username: string, password: string): Promise<IUser | null> {
    const userFound = await this._repository.login({ username, password });
    if (!userFound) throw "Unauthorized";
    const match = EncryptPassword.verifyPassword(password, userFound.password);
    if (!match) throw "Unauthorized";
    return { username: userFound.username, id: userFound.id };
  }
}

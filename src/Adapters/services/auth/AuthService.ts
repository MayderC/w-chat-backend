import {User} from "../../../Infraestructure/database/models/user.model";
import {EncryptPassword} from "../../helpers/encryptPassword";
import {AuthRepository} from "../../repositories/AuthRepository";

interface IUser {
  username: string;
  id: string;
}

export class AuthService {
  private readonly _repository : AuthRepository;

  constructor(authRepository : any) {
    this._repository = authRepository;
  }

  async register(username: string, password: string): Promise<IUser> {
    const passHashed = EncryptPassword.encryptPassword(password);
    const userSaved = await User.create({
      username: username,
      password: passHashed,
    });
    return {username: userSaved.username, id: userSaved.id};
  }

  async getProfile(id: string): Promise<IUser> {
      const user = await this._repository.getById(id);
      return  { username: user.username, id: user.id }
  }

  async login(username: string, password: string): Promise<IUser> {
    const userFound = await this._repository.getByUsername(username);
    const match = EncryptPassword.verifyPassword(password, userFound.password);
    if (!match) throw "Unauthorized";
    return { username: userFound.username, id: userFound.id };
  }
}

import IAuthService from "../../../Application/Ports/services/IAuthService";
import { AuthRepository } from "../../repositories/AuthRepository";
import {
  IAuthLoginRequest,
  IAuthLoginResponse,
  IAuthRegisterRequest,
  IAuthRegisterResponse,
} from "../../../Application/DTOs/auth";
import { EncryptPassword } from "../../helpers/encryptPassword";

export  class AuthService implements IAuthService {
  private readonly _repository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this._repository = authRepository;
  }
  async getProfile(id: string): Promise<IAuthRegisterResponse> {
    try {
      const user = await this._repository.getProfile(id);
      return { id: user.id, username: user.username };
    } catch (error) {
      console.log({ error });
      throw new Error("User not found");
    }
  }

  async login(request: IAuthLoginRequest): Promise<IAuthLoginResponse> {
    try {
      const user = await this._repository.login(request);
      const match = EncryptPassword.verifyPassword(request.password, user.password);
      if (!user || !match) throw new Error("Unauthorized");
      return { id: user.id, username: user.username };
    } catch (error) {
      throw new Error("Unauthorized");
    }
  }

  async register(request: IAuthRegisterRequest): Promise<IAuthRegisterResponse> {
    try {
      request.password = EncryptPassword.encryptPassword(request.password);
      const user = await this._repository.register(request);
      return { id: user.id, username: user.username };
    } catch (error) {
      throw new Error("Error");
    }
  }
}
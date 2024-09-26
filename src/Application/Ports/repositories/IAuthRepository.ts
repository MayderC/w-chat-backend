import { AppDataSource } from "../../../Infraestructure/database";
import { IAuthLoginRequest, IAuthLoginResponse, IAuthRegisterRequest } from "../../DTOs/auth";
import { User } from "../../Entities/User";



export interface IAuthRepository {
  appDataSource: typeof AppDataSource;
  login(request: IAuthLoginRequest): Promise<User>;
  register(request: IAuthRegisterRequest): Promise<User>;
  getProfile(id: string): Promise<User>;
}
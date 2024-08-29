import { IAuthLoginRequest, IAuthRegisterRequest } from "../../Application/DTOs/auth";
import { User } from "../../Application/Entities/User";
import { User as UserEntity } from "../../Infraestructure/database/entities/user.entity";
import { IAuthRepository } from "../../Application/Ports/repositories/IAuthRepository";
import { AppDataSource } from "../../Infraestructure/database";
import { EncryptPassword } from './../helpers/encryptPassword';
export class AuthRepository implements IAuthRepository {

    appDataSource: typeof AppDataSource;
    repository: any;

    constructor(appDataSource: typeof AppDataSource) {
        this.appDataSource = appDataSource;
        this.repository = this.appDataSource.getRepository(UserEntity);
    }

    async register(request: IAuthRegisterRequest): Promise<User> {
        try {
            const user = this.repository.create(request);
            const userSaved = await this.repository.save(user);
            return userSaved;
        } catch (error) {
            throw new Error('Register error');
        }
    }

    async login(request: IAuthLoginRequest): Promise<User> {
        try { 
            const user = await this.repository.findOne({
                where: {
                    username: request.username
                }
            });
            const match = EncryptPassword.verifyPassword(request.password, user.password);
            if(user && match)return user;
            throw new Error('User not found');
        } catch (error) {
            console.log({error});
            throw new Error('Login error');
        }
    }

    async getProfile(id: string): Promise<User> {
        try {
            const user = await this.repository.findOne({
                where: {
                    id
                }
            });
            if(user)return user;
            throw new Error('User not found');
        } catch (error) {
            throw new Error('Error getting profile');
        }
    }
}

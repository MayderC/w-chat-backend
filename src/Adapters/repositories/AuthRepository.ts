import {User as userModel} from "../../Infraestructure/database/models/user.model";
import {User} from "../../Application/Entities/User";

export class AuthRepository {
    constructor() {

    }


    async getByUsername(username: string): Promise<User>{
        const userFound = await userModel.findOne({ where: { username: username } });
        if(!userFound) throw "User not found";
        return  userFound
    }

    async getById(id: string): Promise<User>{
        const user = await userModel.findByPk(id);
        if(!user) throw "User not found"
        return user
    }


}
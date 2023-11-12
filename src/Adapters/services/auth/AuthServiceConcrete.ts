import IAuthService from "../../../Application/Ports/services/IAuthService";
import {
    IAuthLoginRequest,
    IAuthLoginResponse,
    IAuthRegisterRequest,
    IAuthRegisterResponse
} from "../../../Application/DTOs/auth";

export default class AuthServiceConcrete implements IAuthService {
    login(request: IAuthLoginRequest): Promise<IAuthLoginResponse> {
        return Promise.resolve({id: "", username: ''});
    }

    register(request: IAuthRegisterRequest): Promise<IAuthRegisterResponse> {
        return Promise.resolve({id:'', username:''});
    }

}
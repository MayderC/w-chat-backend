import {IAuthLoginRequest, IAuthLoginResponse, IAuthRegisterRequest, IAuthRegisterResponse} from "../../DTOs/auth";

export default interface IAuthService {
    login(request: IAuthLoginRequest): Promise<IAuthLoginResponse>
    register(request: IAuthRegisterRequest): Promise<IAuthRegisterResponse>
}
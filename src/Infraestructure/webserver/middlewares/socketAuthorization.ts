import { AuthService } from "../../../Adapters/services/auth/AuthService";
import { Socket } from "socket.io";
import { decodeToken } from "../helpers/jsonwebtoken";
import { DependencyContainer } from '../../../config/container/DependencyContainer'


export const socketAuthorization = async (socket: any, next: any) => {
  const token = socket.handshake.auth.token;
  const dependency = new DependencyContainer();
  const auth: AuthService = dependency.container.resolve('authService')
  try {
    console.log({token})
    const data = await auth.getProfile(decodeToken(token).id)
  if (data) {
    socket.userInfo = {
      data: data,
      token: token,
    };
    next();
  } else {
    return socket.disconnect();
    //return next(new Error("Authentication error"));
  }
  }catch (e) {
    console.log(e)
  }
};

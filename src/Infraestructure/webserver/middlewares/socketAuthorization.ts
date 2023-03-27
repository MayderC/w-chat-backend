import { AuthService } from "../../../Adapters/services/auth/AuthService";
import { Socket } from "socket.io";
import { decodeToken } from "../helpers/jsonwebtoken";
import { DependencyContainer } from '../../../config/container/DependencyContainer'


export const socketAuthorization = async (socket: any, next: any) => {
  const token = socket.handshake.auth.token;
  const dependecy = new DependencyContainer();
  const auth: AuthService = dependecy.container.resolve('authService')
  const data = auth.getProfile(decodeToken(token).id)
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
};

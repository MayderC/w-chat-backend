const {
  AuthService,
} = require("../../Application/Adapters/services/auth/auth.service");
const auth = new AuthService();
import {decodeToken} from '../helpers/jsonwebtoken' 

export const socketAuthorization = async (socket: any, next: any) => {
  const token = socket.handshake.auth.token;
  const data = await auth.getProfile(Number(decodeToken(token).id) );
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

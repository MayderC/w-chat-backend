const { AuthService } = require("../../Application/services/auth/auth.service");
const auth = new AuthService();

export const socketAuthorization = async (socket: any, next: any) => {
  const token = socket.handshake.auth.token;
  const data = await auth.getProfile(token);
  if (data) {
    socket.userInfo = {
      data: data,
      token: token,
    };
    next();
  } else {
    socket.disconnect();
    return next(new Error("Authentication error"));
  }
};

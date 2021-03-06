const { AuthService } = require("../services/auth/auth.service");
const auth = new AuthService();

const socketAuthorization = async (socket, next) => {
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

module.exports = { socketAuthorization };

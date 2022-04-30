const { onMessage } = require("./onEvents/onMessage");
const { joinRoom } = require("./onEvents/onJoinGlobalRoom");

const socketController = (socket) => {
  joinRoom(socket);
  onMessage(socket);
};

module.exports = { socketController };

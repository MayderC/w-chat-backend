const { onMessage } = require("./onEvents/onMessage");
const { joinRoom } = require("../socket/onEvents/onJoinGlobalRoom");

const socketController = (socket) => {
  joinRoom(socket);
  onMessage(socket);
};

module.exports = { socketController };

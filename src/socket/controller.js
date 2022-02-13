const { onMessage } = require("./onEvents/onMessage");

const socketController = (socket) => {
  onMessage(socket);
};

module.exports = { socketController };

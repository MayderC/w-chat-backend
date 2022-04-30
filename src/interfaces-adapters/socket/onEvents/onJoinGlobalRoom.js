const { GLOBAL_ROOM } = require("../Rooms/names");
const { Socket } = require("socket.io");
const { GlobalMessage } = require("../../../aplication-bussines-rules/services/global-msg/messages");
const menssage = new GlobalMessage();

const joinRoom = (socket = Socket) => {
  socket.on("join-global", async () => {
    socket.join(GLOBAL_ROOM);
    const data = await menssage.geMessages();
    socket.emit(
      "joined",
      JSON.stringify({ user: socket.userInfo.data, messages: data })
    );
  });
};

module.exports = { joinRoom };

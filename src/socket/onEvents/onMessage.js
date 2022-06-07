const { GlobalMessage } = require("../../services/msg/messages");
const { GLOBAL_ROOM } = require("../Rooms/names");
const global_message = new GlobalMessage();

const onMessage = (socket) => {
  socket.on("send-message", async (payload, callback) => {
    const { id, msg, date } = await global_message.insertMessage(
      socket.userInfo,
      payload.msg
    );

    const response = {
      id_message: id,
      message: msg,
      date,
      id_user: socket.userInfo.data.id,
      username: socket.userInfo.data.username,
    };

    callback(response);

    socket.to(GLOBAL_ROOM).emit("message", JSON.stringify(response));
  });
};

module.exports = { onMessage };

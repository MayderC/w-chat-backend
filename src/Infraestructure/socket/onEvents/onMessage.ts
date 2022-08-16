import { GlobalMessageService } from "../../../Application/services/global-msg/messages";
import IGlobalMessageRequest from "../../../Application/Entities/message/IGlobalMessageRequest";
const { GLOBAL_ROOM } = require("../Rooms/names");
const global_message = new GlobalMessageService();

const onMessage = (socket: any) => {
  socket.on("send-message", async (payload: any, callback: Function) => {
    const { id, msg, date } = await global_message.insertMessage(
      socket.userInfo,
      payload.msg
    );

    const response: IGlobalMessageRequest = {
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

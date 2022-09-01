import IGlobalMessageRequest from "../../../Application/DTOs/message/IGlobalMessageRequest";
import { GlobalMessageService } from "../../../Application/Adapters/services/global-msg/messages";
import { E_MESSAGE, O_SEND_MESSAGE } from "./eventNames";
const global_message = new GlobalMessageService();
const { GLOBAL_ROOM } = require("../Rooms/names");

const onMessage = (socket: any) => {

  socket.on(O_SEND_MESSAGE, async (payload: any, callback: Function) => {
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
    socket.to(GLOBAL_ROOM).emit(E_MESSAGE, JSON.stringify(response));
  });
};

module.exports = { onMessage };

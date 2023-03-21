const { GLOBAL_ROOM } = require("../Rooms/names");
const { Socket } = require("socket.io");
import { GlobalMessageService } from "../../../Adapters/services/global-msg/messages";
import { O_JOIN_GLOBAL, E_JOINED, E_ONLINE_USER_LIST } from "./eventNames";
const message = new GlobalMessageService();

export const joinGlobalRoom = (socket: typeof Socket) => {
  socket.on(O_JOIN_GLOBAL, async (userConected: any) => {
    try {
      socket.join(GLOBAL_ROOM);
      const data = await message.geMessages();
      const msg = JSON.stringify({
        user: socket.userInfo.data,
        messages: data,
      });
      socket.emit(E_JOINED, msg);
      socket.broadcast.emit(E_ONLINE_USER_LIST, userConected);
    } catch (error) {
      socket.disconnect("unauthorized");
    }
  });
};

const { GLOBAL_ROOM } = require("../Rooms/names");
const { Socket } = require("socket.io");
import { GlobalMessageService } from "../../../Adapters/services/global-msg/messages";
const message = new GlobalMessageService();

export const joinGlobalRoom = (socket: typeof Socket) => {
  socket.on("join-global", async (userConected: any) => {
    try {
      socket.join(GLOBAL_ROOM);
      const data = await message.geMessages();
      const msg = JSON.stringify({
        user: socket.userInfo.data,
        messages: data,
      });
      socket.emit("joined", msg);
      socket.broadcast.emit("online-user-list", userConected);
    } catch (error) {
      socket.disconnect("unauthorized");
    }
  });
};

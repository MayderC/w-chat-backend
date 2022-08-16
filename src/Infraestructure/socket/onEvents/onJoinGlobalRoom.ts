const { GLOBAL_ROOM } = require("../Rooms/names");
const { Socket } = require("socket.io");
import { GlobalMessageService } from "../../../Application/services/global-msg/messages";
const message = new GlobalMessageService();

export const joinRoom = (socket: typeof Socket) => {
  socket.on("join-global", async () => {
    socket.join(GLOBAL_ROOM);
    const data = await message.geMessages();
    socket.emit(
      "joined",
      JSON.stringify({ user: socket.userInfo.data, messages: data })
    );
  });
};

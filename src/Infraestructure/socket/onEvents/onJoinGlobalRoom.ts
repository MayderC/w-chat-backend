const { GLOBAL_ROOM } = require("../Rooms/names");
const { Socket } = require("socket.io");
import { AppDataSource } from "../../database";
import { Message } from "../../database/entities/message.entity";
import { RoomType } from "../../database/entities/room.entity";
import { O_JOIN_GLOBAL, E_JOINED, E_ONLINE_USER_LIST } from "./eventNames";


export const joinGlobalRoom = (socket: typeof Socket) => {
  socket.on(O_JOIN_GLOBAL, async (userConnected: any) => {
    try {
      socket.join(GLOBAL_ROOM);
      const reository = AppDataSource.getRepository(Message);
      const data = await reository.find({where: {type: RoomType.GLOBAL}})
      const msg = JSON.stringify({
        user: socket.userInfo.data,
        messages: data,
      });
      socket.emit(E_JOINED, msg);
      socket.broadcast.emit(E_ONLINE_USER_LIST, userConnected);
    } catch (error) {
      socket.disconnect("unauthorized");
    }
  });
};

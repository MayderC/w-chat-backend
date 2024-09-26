import IGlobalMessageRequest from "../../../Application/DTOs/message/IGlobalMessageRequest";
import { AppDataSource } from "../../database";
import { Message } from "../../database/entities/message.entity";
import { RoomType } from "../../database/entities/room.entity";
import { E_MESSAGE, O_SEND_MESSAGE } from "./eventNames";
const { GLOBAL_ROOM } = require("../Rooms/names");

export const onGlobalMessage = (socket: any) => {
  socket.on(O_SEND_MESSAGE, async (payload: any, callback: Function) => {
    const reository = AppDataSource.getRepository(Message);
    // const { id, msg, date } = await global_message.insertMessage(
    //   socket.userInfo,
    //   payload.msg
    // );

    const { id, msg, created_at } = await reository.save({
      msg: payload.msg,
      type: RoomType.GLOBAL,
      user: socket.userInfo.data,
    });


    const response: IGlobalMessageRequest = {
      id_message: id,
      message: msg,
      date : created_at,
      id_user: socket.userInfo.data.id,
      username: socket.userInfo.data.username,
    };

    callback(response);
    socket.to(GLOBAL_ROOM).emit(E_MESSAGE, JSON.stringify(response));
  });
};

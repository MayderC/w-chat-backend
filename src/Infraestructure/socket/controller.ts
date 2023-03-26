import { joinGlobalRoom } from "./onEvents/onJoinGlobalRoom";
import { onGlobalMessage } from "./onEvents/onGlobalMessage";

export const socketController = (socket: any, io: any) => {
  joinGlobalRoom(socket);
  onGlobalMessage(socket);
  console.log(io)
};

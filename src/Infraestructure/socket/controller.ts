import { joinGlobalRoom } from "./onEvents/onJoinGlobalRoom";
import { onGlobalMessage } from "./onEvents/onGlobalMessage";

export const socketController = (socket: any) => {
  joinGlobalRoom(socket);
  onGlobalMessage(socket);
};

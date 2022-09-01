const { onMessage } = require("./onEvents/onMessage");
import { joinGlobalRoom } from "./onEvents/onJoinGlobalRoom";

export const socketController = (socket: any) => {
  joinGlobalRoom(socket);
  onMessage(socket);
  
};

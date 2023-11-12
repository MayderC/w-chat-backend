import {Room} from "../../Entities/Room";
export interface IRoomService {
    getRom(id: string): Promise<Room>
    getRoomsByUser(username: string): Promise<Array<Room>>
    //user to user
    createRoomUTU(): Promise<Room>
    //user to multi user
    createRoomUTMU():Promise<Room>
}
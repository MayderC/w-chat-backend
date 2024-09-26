import { Room, RoomType } from "../../../Infraestructure/database/entities/room.entity";
export interface IRoomService {
    getRoom(id: string): Promise<Room>
    getRoomsByUser(username: string): Promise<Array<Room>>
    createRoom(type: RoomType, id?: string): Promise<Room>
}
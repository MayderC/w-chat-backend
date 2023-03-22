import {IRoomService} from "../../../Application/Ports/services/IRoomService";
import {Room} from "../../../Application/Entities/Room";

export class RoomService implements IRoomService {

    //private readonly _roomRepository;
    constructor() {
    }
    async createRoomUTMU(): Promise<Room> {
        return {id: '', messages: [], users: []};
    }

    async createRoomUTU(): Promise<Room> {
        return {id: '', messages: [], users: []};
    }

    async getRom(id: string): Promise<Room> {
        return {id: '', messages: [], users: []};
    }

    getRoomsByUser(username: string): Promise<Array<Room>> {
        return Promise.resolve([]);
    }
}
import { Repository } from "typeorm";
import { Room, RoomType } from "../../Infraestructure/database/entities/room.entity";
import { User } from "../../Infraestructure/database/entities/user.entity";
import { IRoomService } from "../../Application/Ports/services/IRoomService";
import { AppDataSource } from "../../Infraestructure/database/";
import { RoomUser } from "../../Infraestructure/database/entities/roomUser.entity";

export class RoomService implements IRoomService{

  roomRepository : Repository<Room>;
  userRepository : Repository<User>;
  roomUserRepository : Repository<RoomUser>;
  appDataSource : typeof AppDataSource;
  
  constructor(
    userRepository: Repository<User>, 
    roomRepository: Repository<Room>, 
    roomUserRepository: Repository<RoomUser>,
    appDataSource: typeof AppDataSource) {

    this.roomRepository = roomRepository;
    this.userRepository = userRepository;
    this.appDataSource = appDataSource;
    this.roomUserRepository = roomUserRepository;

  }
  
  async createRoom(type: RoomType, id?: string): Promise<Room> {
    // trasaction, 
    /**
     * 1. create room use the id provided and type
     * 4. if id, split id by - and create roomUser for each id, usign the same room
     * 5. if not id, create room and return it
     * use transaction to rollback if any error
     */
    return await this.appDataSource.transaction(async manager => {
      const room = manager.create<Room>(Room, { type, id });
      await manager.save<Room>(room);

      // if id, split id by - and create roomUser for each id, usign the same room
      if (id) {
        const userIds = id.split('-');
        const roomUsers = userIds.map(userId => {
          return manager.create<RoomUser>(RoomUser, { userId, roomId: room.id });
        });
        await manager.save<RoomUser>(roomUsers);
      }
      return room;
    })
  }

  async getRoom(id: string): Promise<Room> {
    const room = await this.roomRepository.findOne({ where: { id } });
    if (!room) throw new Error('Room not found');
    return room;
  }

  async getRoomsByUser(username: string): Promise<Array<Room>> {
    const user = await this.userRepository.findOne({ 
      where: { username }, 
      relations: ['roomUsers', 'roomUsers.room'] 
    });
    if (!user) throw new Error('User not found');
    return user.roomUsers.map(roomUser => roomUser.room);
  }
}
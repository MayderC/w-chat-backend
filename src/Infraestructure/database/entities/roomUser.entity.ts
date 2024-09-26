import { Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room.entity";
import { User } from "./user.entity";



@Entity("room_user")
export class RoomUser {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  roomId: string;

  @ManyToOne(() => Room, (room) => room.roomUsers)
  @JoinColumn({ name: "roomId" })
  room: Room;

  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => User, (user) => user.roomUsers)
  @JoinColumn({ name: "userId" })
  user: User;
}
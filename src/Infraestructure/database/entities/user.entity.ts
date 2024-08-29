
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User as IUser } from "../../../Application/Entities/User";
import { RoomUser } from "./roomUser.entity";

@Entity()
export class User implements IUser  {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => RoomUser, (roomUser) => roomUser.room)
  roomUsers: RoomUser[];

}
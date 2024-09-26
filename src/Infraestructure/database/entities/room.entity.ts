import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { RoomUser } from "./roomUser.entity";

export enum RoomType {
  ONE_TO_ONE = "ONE_TO_ONE",
  GLOBAL = "GLOBAL",
  GROUP = "GROUP",
}

@Entity("room")
export class Room {
  @PrimaryColumn()
  id: string;

  @BeforeInsert()
  generateId() {
    if (!this.id) this.id = uuidv4();
  }

  @Column()
  name: string;

  @Column()
  type: RoomType;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => RoomUser, (roomUser) => roomUser.room)
  roomUsers: RoomUser[];
}
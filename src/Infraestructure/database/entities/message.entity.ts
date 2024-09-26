
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, PrimaryColumn, CreateDateColumn } from "typeorm";
import  {User}  from "./user.entity";
import { Room } from "./room.entity";






@Entity("global_message")
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @PrimaryColumn()
  roomId: string;

  @ManyToOne(() => Room)
  @JoinColumn({ name: "roomId" })
  room: Room

  @CreateDateColumn()
  created_at: Date;

  @Column("text")
  msg: string;

  @Column()
  type: string;

}

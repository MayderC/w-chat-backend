import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

export enum FriendStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

@Entity('friend')
export class Friend {
  @PrimaryGeneratedColumn()
  id: string;

  @PrimaryColumn()
  senderId: string;

  @PrimaryColumn()
  receiverId: string;

  @Column({ default: FriendStatus.PENDING })
  status: FriendStatus;

  @ManyToOne(() => User)
  @JoinColumn({ name: "senderId" })
  senderUser: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: "receiverId" })
  receiverUser: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  acepted_at: Date;
}

import { Chat } from "../chat/chat.entity";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToOne,
  ManyToOne,
  JoinTable,
} from "typeorm";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  idMessage: Number;

  @ManyToOne(() => Chat)
  @JoinTable()
  chat: Chat;

  @Column()
  createdAt: Date;

  @Column()
  text: string;

  @Column()
  telefone: string;

  @Column({ default: false })
  censurado: boolean;

  constructor(message?: Partial<Message>) {
    this.idMessage = message?.idMessage;
    this.chat = message?.chat;
    this.createdAt = message?.createdAt;
    this.text = message?.text;
    this.telefone = message?.telefone;
    this.censurado = message?.censurado;
  }
}

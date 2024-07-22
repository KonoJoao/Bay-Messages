
import { Chat } from "src/chat/chat.entity";
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
  text: string ;
  @Column()
  telefone: string ;
  


}

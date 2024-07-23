import { Message } from "src/message/message.entity";
import { Usuario } from "src/usuario/usuario.entity";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
} from "typeorm";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: Number;

  @ManyToMany(() => Usuario)
  @JoinTable()
  usuarios: Usuario[];

  @OneToMany(() => Message, (message) => message.chat)
  message: Message[];

  @Column({ default: false })
  flagGrupo: boolean = false;

  @Column()
  nome: string = "";

  @Column({ default: "" })
  administrador: string = "";
}

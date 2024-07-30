import { Message } from "../message/message.entity";
import { Usuario } from "../usuario/usuario.entity";
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

  @ManyToMany(() => Usuario)
  @JoinTable()
  bloqueados?: Usuario[];

  @OneToMany(() => Message, (message) => message.chat)
  message?: Message[];

  @Column({ default: false })
  flagGrupo: boolean = false;

  @Column()
  nome: string = "";

  @Column({ default: "" })
  administrador: string = "";
}

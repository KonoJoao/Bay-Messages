import { Usuario } from "src/usuario/usuario.entity";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToOne,
  JoinTable,
} from "typeorm";

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  flagGrupo: boolean = false;

  @Column()
  nome: string = "";

  @ManyToMany(() => Usuario)
  @JoinTable()
  usuarios: Usuario[] = null;

  @Column()
  administrador: string;
}

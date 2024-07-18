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

  @ManyToMany(() => Usuario)
  @JoinTable()
  usuarios: Usuario[];

  @Column({ default: false })
  flagGrupo: boolean = false;

  @Column()
  nome: string = "";

  @Column({ default: "" })
  administrador: string = "";
}

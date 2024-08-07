import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  telefone: string;

  @Column()
  senha: string;

  // @Column({ type: "simple-array", nullable: true })
  // bloqueados: string[];

  @Column({ nullable: true })
  banidoAte: Date;

  @Column({ nullable: true })
  codigoVerificacao: string;
}

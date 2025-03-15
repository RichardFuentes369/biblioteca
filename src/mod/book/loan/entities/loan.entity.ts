import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { loanStatus } from './enums/loanStatus';

@Entity('mod_loan')
export class Loan {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  libro_id: number;

  @Column()
  usuario_final_id: number;

  @Column({
    nullable: true
  })
  usuario_biblioteca_id: number;

  @Column({
    type: 'enum',
    enum: loanStatus,
    default: loanStatus.Solicitado,
  })
  type: loanStatus;

}

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('mod_detail_loan')
export class DetailLoan {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // enum => estado_prestamo
  // libro_id => 
  // fecha_prestamo => 
  // usuario_pidio_prestamo_id => 
  // usuario_presto_libro => 
  // detail_loan_id => 
}

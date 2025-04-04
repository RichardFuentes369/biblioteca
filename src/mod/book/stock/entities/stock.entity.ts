import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('mod_libros')
export class Stock {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;
  
  @Column()
  isbn: string;

  @Column()
  publisher: string;

  @Column()
  year_of_publication: number;

  @Column()
  size_pages: number;

  @Column()
  genre: string;

  @Column()
  inStock: number;

  @Column()
  inLoan: number;

  @Column()
  damaged: number;

  @Column()
  total: number;

  @Column()
  language: string;
}
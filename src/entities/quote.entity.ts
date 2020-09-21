import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn() added: Date;

  @Column()
  author: string;

  @Column()
  content: string;
}
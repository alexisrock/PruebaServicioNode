import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Producto{
    @PrimaryGeneratedColumn()
    Id: number = 0;
    @Column()
    Name: string = "";
    @Column()
    Description!: string;
    @Column()
    Price!: number;
    @Column()
    Stock!: number;

  
}
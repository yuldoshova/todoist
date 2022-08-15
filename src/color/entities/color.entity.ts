import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('colors')
export class Color {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false})
    name: string;
    
}

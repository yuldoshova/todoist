import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IsEmail } from 'class-validator';
import { Role } from './role';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @Column({ type: 'jsonb' })
    settings: JSON;

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role;

    @Column({default:false})
    isBlocked: boolean;

    @Column()
    photoUrl: string;
    
}

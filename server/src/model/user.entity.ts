import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';
import { ClienteEntity } from '../model/cliente.entity';

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password);
    }

    @OneToMany(() => ClienteEntity, cliente => cliente)
    clientes: ClienteEntity[];
}
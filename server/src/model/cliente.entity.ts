import { Entity, Column, OneToMany, JoinColumn } from 'typeorm';
import { AtividadeEntity } from './atividade.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'cliente' })
export class ClienteEntity extends BaseEntity {

    @Column({ type: 'varchar', length: 300 })
    nome: string;

    @Column({ type: 'varchar', length: 11})
    cpf: string;


    @OneToMany(() => AtividadeEntity, AtividadeEntity => AtividadeEntity.cliente, { eager: true })
    @JoinColumn()
    atividades: AtividadeEntity[];
}
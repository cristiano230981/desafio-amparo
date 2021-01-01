import { eStatus } from '../shared/enuns';
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ClienteEntity } from './cliente.entity';

@Entity({ name: 'atividade' })
export class AtividadeEntity extends BaseEntity {

    @Column({ type: 'varchar', length: 300 })
    descricao: string;

    @Column({ type: 'timestamptz' })
    vencimento: Date;

    // @Column({
    //     type: "enum",
    //     enum: eStatus,
    //     default: eStatus.Aberto
    // })
    // status: eStatus;
    @Column({
        type: "integer",
        default: 0
    })
    status: number;

    @ManyToOne(type => ClienteEntity, ClienteEntity => ClienteEntity.atividades)
    cliente: ClienteEntity;

    @Column({ type: 'varchar' })
    clienteId: string;

}
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ClienteEntity } from './cliente.entity';

@Entity({ name: 'atividade' })
export class AtividadeEntity extends BaseEntity {

    @Column({ type: 'varchar', length: 300 })
    descricao: string;

    @Column({ type: 'timestamptz' })
    vencimento: Date;

    @Column({
        type: "integer",
        default: 0
    })
    status: number;

    @ManyToOne(() => ClienteEntity, ClienteEntity => ClienteEntity.atividades)
    cliente: ClienteEntity;

    @Column({ type: 'varchar' })
    clienteId: string;

}
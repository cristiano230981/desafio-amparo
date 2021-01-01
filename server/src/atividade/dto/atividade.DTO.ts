import { ApiProperty } from '@nestjs/swagger';
import { isObject, IsString, IsUUID, } from 'class-validator';
import { eStatus } from '../../shared/enuns';

import { AtividadeEntity } from '../../model/atividade.entity';
import { ClienteEntity } from '../../model/cliente.entity';
import { ClienteDTO } from '../../cliente/dto/cliente.DTO';

export class AtividadeDTO implements Readonly<AtividadeDTO > {
    @ApiProperty({ required: true })
    @IsUUID()
    id: string;

    @ApiProperty({ required: true })
    @IsString()
    descricao: string;

    @ApiProperty({ required: true })
    @IsString()
    vencimento: Date;

    @ApiProperty({ required: true })
    @IsString()
    status: eStatus;

    @ApiProperty({ required: true })
    cliente: ClienteDTO;

    clienteId: string;

    public static from(dto: Partial<AtividadeDTO>) {
        const it = new AtividadeDTO();
        it.id = dto.id;
        it.descricao = dto.descricao;
        it.vencimento = dto.vencimento;
        it.status = dto.status;
        it.clienteId = dto.clienteId;
        it.cliente = dto.cliente;
        return it;
    }

    public static fromEntity(entity: AtividadeEntity) {
        
        return this.from({
            id: entity.id,
            descricao: entity.descricao,
            vencimento: entity.vencimento,
            status: entity.status,
            clienteId: entity.clienteId,
            cliente: ClienteDTO.fromEntity(entity.cliente)
        });
    }

    public toEntity(user = null) {
        const it = new AtividadeEntity();
        it.id = this.id;
        it.descricao = this.descricao;
        it.vencimento = this.vencimento;
        it.status = this.status;
        it.clienteId = this.clienteId;
        //it.cliente = ClienteDTO.toEntity(this.cliente);

        it.createdBy = user ? user.id : null;
        it.lastChangedBy = user ? user.id : null;
        return it;
    }
}

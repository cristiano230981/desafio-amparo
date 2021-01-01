//import { ApiModelProperty } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, } from 'class-validator';
import { ClienteEntity } from '../../model/cliente.entity';

export class ClienteDTO implements Readonly<ClienteDTO> {
    @ApiProperty({ required: true })
    @IsUUID()
    id: string;

    @ApiProperty({ required: true })
    @IsString()
    nome: string;

    @ApiProperty({ required: true })
    @IsString()
    cpf: string;

    public static from(dto: Partial<ClienteDTO>) {
        const it = new ClienteDTO();
        it.id = dto.id;
        it.nome = dto.nome;
        it.cpf = dto.cpf;
        return it;
    }

    public static fromEntity(entity: ClienteEntity) {
        if (entity == null) return;
        return this.from({
            id: entity.id,
            nome: entity.nome,
            cpf: entity.cpf
        });
    }

    public toEntity(user = null) {
        const it = new ClienteEntity();
        it.id = this.id;
        it.nome = this.nome;
        it.cpf = this.cpf;
        it.createDateTime = new Date();
        it.createdBy = user ? user.id : null;
        it.lastChangedBy = user ? user.id : null;
        
        return it;
    }
}
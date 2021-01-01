import { ClienteEntity } from "../../model/cliente.entity";
import { eStatus } from "../../shared/enuns";

export class CriaAtividadeDto {
    readonly id: string;
    readonly descricao: string;
    readonly vencimento: Date;
    readonly status: eStatus;
    readonly cliente: ClienteEntity;
}

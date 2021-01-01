import { ClienteDTO } from "./dto/cliente.DTO";

export interface ClienteRO {
    results: ClienteDTO[];
    resultCount: number;
}
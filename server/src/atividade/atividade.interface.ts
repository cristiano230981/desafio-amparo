import { AtividadeDTO } from "./dto/atividade.DTO";

export interface AtividadeRO {
    result: AtividadeDTO;
}

export interface AtividadesRO {
    results: AtividadeDTO[];
    resultCount: number;
}
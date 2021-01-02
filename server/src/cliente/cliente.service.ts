import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { AtividadeEntity } from '../model/atividade.entity';
import { ClienteEntity } from '../model/cliente.entity';
import { ClienteRO } from './cliente.interface';
import { ClienteDTO } from './dto/cliente.DTO';
import { CriaClienteDTO } from './dto/cria_cliente.DTO';

@Injectable()
export class ClienteService {

    constructor(@InjectRepository(ClienteEntity) private readonly repo: Repository<ClienteEntity>,
                @InjectRepository(AtividadeEntity) private readonly repoAtividade: Repository<AtividadeEntity> ){ }

    public async findAll(query): Promise<ClienteRO> {       
        const qb = await getRepository(ClienteEntity)
            .createQueryBuilder('c')
            .leftJoinAndSelect('atividade', 'a', 'a.clienteId=c.Id');
        
        qb.where("1 = 1");
        qb.orderBy('a.vencimento', 'DESC');

        if ('nome' in query) {
            qb.andWhere("lower(c.nome) LIKE lower(:nome)", { nome: `%${query.nome}%` });
        }
        
        if ('limit' in query) {
            qb.limit(query.limit);
        }
        
        if ('offset' in query) {
            qb.offset(query.offset);
        }

        const resultCount = await qb.getCount();
        const results = await qb.getMany()
                .then(items => items.map(e => ClienteDTO.fromEntity(e)));

        return { results, resultCount};

    }

    public async create2(dto: ClienteDTO, user): Promise<ClienteDTO> {
        return this.repo.save(dto.toEntity(user))
            .then(e => ClienteDTO.fromEntity(e));
    }

    async create(userId: number, clienteData: CriaClienteDTO): Promise<CriaClienteDTO> {

        let cliente = new ClienteEntity();
        cliente.nome = clienteData.nome;
        cliente.cpf = clienteData.cpf;
        cliente.createdBy = userId.toString();
        cliente.lastChangedBy = userId.toString();

        const novoCliente = await this.repo.save(cliente);

        return novoCliente;

    }

}
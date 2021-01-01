import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AtividadeEntity } from '../model/atividade.entity';
import { getRepository, Repository } from 'typeorm';
import { AtividadeDTO } from './dto/atividade.DTO';
import { ClienteDTO } from '../cliente/dto/cliente.DTO';
import { ClienteEntity } from '../model/cliente.entity';
import { AtividadeRO, AtividadesRO } from './atividade.interface';
import { CriaAtividadeDto } from './dto/cria_atividade.DTO';

@Injectable()
export class AtividadeService {

    constructor(@InjectRepository(ClienteEntity) private readonly repo: Repository<ClienteEntity>,
        @InjectRepository(AtividadeEntity) private readonly repoAtividade: Repository<AtividadeEntity>) { }

    public async findAll(query): Promise<AtividadesRO> {

        // const qb = await getRepository(ClienteEntity)
        //     .createQueryBuilder('c')
        //     .leftJoinAndSelect('atividade', 'a', 'a.clienteId=c.Id');

        const qb = await getRepository(AtividadeEntity)
            .createQueryBuilder('a')
            .innerJoinAndSelect('cliente', 'c', 'a."clienteId"=c.Id');

        qb.where("1 = 1");
        // qb.orderBy('a.vencimento', 'DESC');

        // if ('limit' in query) {
        //     qb.limit(query.limit);
        // }

        // if ('offset' in query) {
        //     qb.offset(query.offset);
        // }

        if ('limit' in query) {
            qb.limit(query.limit);
        }

        if ('offset' in query) {
            qb.offset(query.offset);
        }

        //console.log(qb);

         //const results2 = await qb.getMany().then(items => items.map(e => ClienteDTO.fromEntity(e.cliente)));
         //console.log(results2);

        // const results3 = await qb.getMany().then(items => items.map(e => AtividadeDTO.fromEntity(e)));
        // console.log(results3);

        const resultCount = await qb.getCount();
        const results = await qb.getMany()
            .then(items => items.map(e => AtividadeDTO.fromEntity(e)));
        
        
        // results.map(function (e) { 
        //     const cliente = this.repo.findOne({ where: { id: e.clienteId } })
        //         .then(item => ClienteDTO.fromEntity(item));
            
        //     cliente.then(function (c) {
        //         return e.cliente = c;
        //     });
            
        // });

        for (var i = 0; i < results.length; i++) {
            const cliente = await this.repo.findOne({ where: { id: results[i].clienteId } })
                .then(item => ClienteDTO.fromEntity(item));
            
            results[i].cliente = cliente; // Add "total": 2 to all objects in array
        }

        // const teste= results.map(async (obj) => {
        //     const cliente = await this.repo.findOne({ where: { id: obj.clienteId } })
        //         .then(item => ClienteDTO.fromEntity(item));

        //     console.log(cliente);
            
        //     //cliente.then(function (c) {
        //         obj.cliente = cliente;
        //     //});


        //     //obj.total = 2;
        //     // or via brackets
        //     // obj['total'] = 2;
        //     return obj;
        // })

        // results.forEach(element => {
        //     const cliente = this.repo.findOne({ where: { id: element.clienteId } })
        //         .then(item => ClienteDTO.fromEntity(item));
            
        //     cliente.then(function (c) { 
        //         element.cliente = c;  
        //         console.log(element.cliente);
        //     });
        // });
        
        //const author = await this.userRepository.findOne({ where: { id: userId }, relations: ['articles'] });
        //author.articles.push(article);
        
        //console.log(results);
        
        return { results, resultCount };

    }

    async findOne(where): Promise<AtividadeRO> {
        const result = await this.repoAtividade.findOne(where)
            .then(item => AtividadeDTO.fromEntity(item));
        
        return { result };
    }

    async update(id: string, atividadeData: any): Promise<AtividadeRO> {
        let toUpdate = await this.repoAtividade.findOne({ id: id });
        let updated = Object.assign(toUpdate, atividadeData);
        const result = await this.repoAtividade.save(updated)
            .then(item => AtividadeDTO.fromEntity(item));
        return { result };
    }

    async create(userId: number, atividadeData: CriaAtividadeDto): Promise<CriaAtividadeDto> {

        let atividade = new AtividadeEntity();
        atividade.descricao = atividadeData.descricao;
        atividade.cliente = atividadeData.cliente;
        atividade.vencimento = atividadeData.vencimento;
        atividade.status = atividadeData.status;
        atividade.createdBy = userId.toString();
        atividade.lastChangedBy = userId.toString();
        
        const novaAtividade = await this.repoAtividade.save(atividade);

        return novaAtividade;

    }
}
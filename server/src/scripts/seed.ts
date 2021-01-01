import * as _ from 'lodash';
import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '../config/config.service';
import { ClienteService } from '../cliente/cliente.service';
import { ClienteEntity } from '../model/cliente.entity';
import { ClienteDTO } from '../cliente/dto/cliente.DTO';
import { AtividadeEntity } from '../model/atividade.entity';
import { AtividadeService } from '../atividade/atividade.service';
import { AtividadeDTO } from '../atividade/dto/atividade.DTO';

async function run() {

    const seedUser = { id: 'seed-user' };

    const seedId = Date.now()
        .toString()
        .split('')
        .reverse()
        .reduce((s, it, x) => (x > 3 ? s : (s += it)), '');

    const opt = {
        ...configService.getTypeOrmConfig(),
        debug: true
    };

    const connection = await createConnection(opt as ConnectionOptions);
    const clienteService = new ClienteService(connection.getRepository(ClienteEntity),connection.getRepository(AtividadeEntity));
    const atividadeService = new AtividadeService(connection.getRepository(ClienteEntity), connection.getRepository(AtividadeEntity));
    

    const workCliente = _.range(1, 5)
        .map(n => ClienteDTO.from({
            nome: `Cliente seed${seedId}-${n}`,
            cpf: '01234567890'
            
        }))
        .map(dto => clienteService.create(dto, seedUser)
            .then(r => (console.log('done ->', r.nome), r)))
    
    return await Promise.all(workCliente);

    // const workAtividade = _.range(1, 10)
    //     .map(n => AtividadeDTO.from({
    //         descricao: `Atividade Seed${seedId}-${n}`,
    //         vencimento: new Date()
    //     }))
    //     .map(dto => atividadeService.create(dto, seedUser)
    //         .then(r => (console.log('done ->', r.descricao), r)))

    // return await Promise.all(workAtividade);
}

run()
    .then(_ => console.log('...wait for script to exit'))
    .catch(error => console.error('seed error', error));
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../model/user.entity';
import { ClienteService } from './cliente.service';
import { AuthMiddleware } from '../user/auth.middleware';
import { UserModule } from '../user/user.module';
import { ClienteEntity } from '../model/cliente.entity';
import { AtividadeEntity } from '../model/atividade.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ClienteEntity, UserEntity, AtividadeEntity]), UserModule],
    providers: [ClienteService],
    controllers: [
        ClienteController
    ]
})
export class ClienteModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: 'clientes', method: RequestMethod.GET },
                { path: 'clientes', method: RequestMethod.POST },
                { path: 'clientes/:id', method: RequestMethod.DELETE },
                { path: 'clientes/:id', method: RequestMethod.PUT },
                { path: 'clientes/:atividade', method: RequestMethod.POST },
                { path: 'clientes/:atividade/:id', method: RequestMethod.DELETE },
                { path: 'clientes/:atividade', method: RequestMethod.DELETE });
    }
}
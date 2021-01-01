import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AtividadeController } from './atividade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../model/user.entity';
import { AtividadeService } from './atividade.service';
import { AuthMiddleware } from '../user/auth.middleware';
import { UserModule } from '../user/user.module';
import { AtividadeEntity } from '../model/atividade.entity';
import { ClienteEntity } from '../model/cliente.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AtividadeEntity, UserEntity, ClienteEntity]), UserModule],
    providers: [AtividadeService],
    controllers: [
        AtividadeController
    ]
})
export class AtividadeModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: 'atividades', method: RequestMethod.GET },
                { path: 'atividades', method: RequestMethod.POST },
                { path: 'atividades/:id', method: RequestMethod.DELETE },
                { path: 'atividades/:id', method: RequestMethod.PUT });
    }
}
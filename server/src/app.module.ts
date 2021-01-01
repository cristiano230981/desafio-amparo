import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';

import { UserModule } from './user/user.module';
import { ClienteModule } from './cliente/cliente.module';
import { AtividadeModule } from './atividade/atividade.module';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ClienteModule, AtividadeModule, UserModule]
})
export class AppModule {}
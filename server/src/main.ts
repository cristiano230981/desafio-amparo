import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);

  app.enableCors();

  app.setGlobalPrefix('api');

  //if (!configService.isProduction()) {

  const document = SwaggerModule.createDocument(app, new DocumentBuilder()
    .setTitle('Amparo API')
    .setDescription('Api do desafio Amparo, esta API foi desenvolvida para servir a Aplicação de atendimento ao Paciente.')
    .setVersion('1.0')
    .setBasePath('api')
    .setContact("Cristiano Moura", "http://www.vbsolutions.com.br", "cristiano.moura@vbsolutions.com.br")
    .setLicense("MIT", "http://mit-license.org")
    .addBearerAuth()
    .build());

  SwaggerModule.setup('docs', app, document);

  //}

  await app.listen(3000);
}

bootstrap();

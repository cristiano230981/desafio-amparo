# desafio-amparo
## Sobre o Desafio
Em primeiro lugar, este desafio foi diferente pra mim pois tive a oportunidade de aprender um pouco sobre VUEjs, algo que até então, só tinha ouvido falar, então optei por utilizar já sabendo que a Ampado utiliza.

Aprendi um pouco e já consigo identificar muitas melhorias neste código como por ex.: components Vue para reaproveitar e melhorar a leitura e manutenção do código (ainda tenho muito o que aprender).

A Api utilizei TypeScript, TypeORM (migration), Nestjs, Swagger (documentação).

<img src="https://static1.smartbear.co/swagger/media/assets/images/swagger_logo.svg" alt="Swagger Logo" width="174" height="50"><img src="https://d33wubrfki0l68.cloudfront.net/e937e774cbbe23635999615ad5d7732decad182a/26072/logo-small.ede75a6b.svg" alt="NestJS - A progressive Node.js framework"  height="50"><img src="https://github.com/typeorm/typeorm/raw/master/resources/logo_big.png" height="50">

TypeScript por ser tipado e facilitar a OOP, Nestjs para desenvolver algo mais escalável e typeORM para o Migration (ajuda a manter as entidades, relacionamentos, etc.) e Swagger para documentação.

Pessoalmente falando o TypeORM parece bacana mas acabei travando com um relacionamento onde a entidade relacionada não carregou a entidade como deveria, talvez com mais tempo resolveria isso.

Tentei enfeitar mais o pavão, coloquei uma tela de login e com o link (http://localhost:8081/register) para criar uma conta (para o teste serve, não seria algo para uma aplicação real fechada).
Achei melhor fazer isso em vez de mockar um acesso.

Por fim, só poderia agradecer a oportunidade de fazer este desafio, com certeza da para melhorar e muito este código!


## Installation

### Client

```bash
$ cd client
$ npm install
$ npm run dev
```

Veja em: http://localhost:8081

## Running Migration (criar o banco)
```bash
# subir o docker do banco e criar o banco 
$ npm run start:dev:db
# gerar o script migration "opcional" (não é necessário neste pois já existe o arquivo na pasta)
$ npm run typeorm:migration:generate -- my_init
# gerar as tabelas no banco
$ npm run typeorm:migration:run
```

### Server (API REST)

```bash
$ cd server
$ npm install
$ npm run start:dev
```

Veja em: http://localhost:3000/docs/ 


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

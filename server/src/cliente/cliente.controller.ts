import { Body, Controller, Get, Post, Query  } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { User } from '../user/user.decorator';

import {
    ApiBearerAuth, ApiOperation, ApiResponse, ApiTags
} from '@nestjs/swagger';
import { ClienteRO } from './cliente.interface';
import { CriaClienteDTO } from './dto/cria_cliente.DTO';

@ApiBearerAuth()
@ApiTags('clientes')
@Controller()
export class ClienteController {
    constructor(private readonly serv: ClienteService) { }

    @ApiOperation({ summary: 'Lista todos os clientes' })
    @ApiResponse({ status: 200, description: 'Return all customers.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Get('clientes')
    public async findAll(@Query() query): Promise<ClienteRO> {
        return await this.serv.findAll(query)
    }

    @ApiOperation({ summary: 'Cadastra um cliente' })
    @ApiResponse({ status: 201, description: 'The customer has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Post('clientes')
    async create(@User('id') userId: number, @Body('cliente') clienteData: CriaClienteDTO) {
        return this.serv.create(userId, clienteData);
    }


}
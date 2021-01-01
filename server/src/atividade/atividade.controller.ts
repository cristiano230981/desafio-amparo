import { Body, Controller, Get, Post, Query, Put, Param  } from '@nestjs/common';
import { AtividadeService } from './atividade.service';
import { User } from '../user/user.decorator';

import {
    ApiBearerAuth, ApiOperation, ApiResponse, ApiTags
} from '@nestjs/swagger';
import { AtividadesRO } from './atividade.interface';
import { CriaAtividadeDto } from './dto/cria_atividade.DTO';

@ApiBearerAuth()
@ApiTags('atividades')
@Controller()
export class AtividadeController {
    constructor(private serv: AtividadeService) { }


    @ApiOperation({ summary: 'Lista todas as atividades' })
    @ApiResponse({ status: 200, description: 'Return all activities.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Get('atividades')
    public async findAll(@Query() query): Promise<AtividadesRO> {
        return await this.serv.findAll(query)
    }

    @ApiOperation({ summary: 'Atualiza uma atividade' })
    @ApiResponse({ status: 201, description: 'The activity has been successfully updated.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Put('atividades/:id')
    async update(@Param() params, @Body('atividade') atividadeData: CriaAtividadeDto) {
        
        return this.serv.update(params.id, atividadeData);
    }

    @ApiOperation({ summary: 'Cria uma nova atividade' })
    @ApiResponse({ status: 201, description: 'The activity has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @Post('atividades')
    async create(@User('id') userId: number, @Body('atividade') atividadeData: CriaAtividadeDto) {
        return this.serv.create(userId, atividadeData);
    }

}
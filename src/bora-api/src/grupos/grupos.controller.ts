// src/grupos/grupos.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { GruposService } from './grupos.service';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { Grupo } from './schema/grupos.schema';
import { User } from '../users/schema/user.schema';

@Controller('grupos')
export class GruposController {
  constructor(private readonly gruposService: GruposService) {}

  /** cria um grupo */
  @Post()
  async create(@Body() createGrupoDto: CreateGrupoDto): Promise<Grupo> {
    return this.gruposService.create(createGrupoDto);
  }

  @Get()
  async findAll(): Promise<Grupo[]> {
    return this.gruposService.findAll();
  }
  @Get(':id/membros')
  async getMembersWithDetails(
    @Param('id') id: string,
  ): Promise<Array<{ user: User; isAdmin: boolean }>> {
    return this.gruposService.getMembersWithDetails(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Grupo> {
    return this.gruposService.findOne(id);
  }

  @Get('usuario/:email')
  async findByUserEmail(@Param('email') email: string): Promise<Grupo[]> {
    return this.gruposService.findByUserEmail(email);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGrupoDto: UpdateGrupoDto,
  ): Promise<Grupo> {
    return this.gruposService.update(id, updateGrupoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Grupo> {
    return this.gruposService.remove(id);
  }
}
